/* eslint-disable max-len */
import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import mailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
// File Upload
import cloudinary from 'cloudinary'
import formidable from 'express-formidable'

import User from '../../models/User'	// Load Models
import Product from '../../models/Product'	// Load Models
import validateRegisterInput from '../../validation/register'
import validateLoginInput from '../../validation/login'


require('dotenv').config()

const router = express.Router()

// upload files
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOID_API_SECRET
})

// nodemailer
const transporter = mailer.createTransport({
	service: process.env.EMAIL_SERVICE,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD
	}
	// host; port; secure (ssl)
})


// @desc: Return current user
// @access: Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({
		data: {
			id: req.user.id,
			name: req.user.name,
			lastname: req.user.lastname,
			email: req.user.email,
			role: req.user.role,
			cart: req.user.cart,
			history: req.user.history
		}
	})
})


// @descr: Update user info
// @access: Private
router.patch('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = await User.findOne({ _id: req.user.id })
    if (!user) {
      return res
        .status(403)
        .json({ error: 'You must sign in to add products to cart' })
    }

    // @TODO: validate fields

    const updatedUser = await User.findOneAndUpdate(
		{ _id: req.params.id },
		{
		$set: {
			name: req.body.name,
			lastname: req.body.lastname,
			email: req.body.email
		}
		},
		{ new: true }
	)

    res.status(200).json(updatedUser)
  }
)


router.post('/register', async (req, res) => {
	// Validate req.body
	const { errors, isValid } = validateRegisterInput(req.body)
	if (!isValid) {
		return res.status(400).json(errors)
	}
	
	// Check unique email
	const emailExists = await User.findOne({ email: req.body.email })
	if (emailExists) {
		errors.email = 'Email have already exists'
		return res.status(400).json(errors)
	}

	// Save
	const user = new User({
		name: req.body.name,
		lastname: req.body.lastname,
		email: req.body.email,
		password: req.body.password
	})

	user.save((err, doc) => {
		if (err) {
			return res.json({
				success: false,
				errors: err
			})
		}
		res.status(200).json({
			success: true,
			data: doc
		})
	})

	// @TODO: send Email confirmation: see emailConfirmed at User.js
	transporter.use('compile', hbs({
      viewPath: 'server/config/mails',
      extName: '.hbs'
    }))

	const mailOptions = {
		from: `eCommerce - <${process.env.EMAIL}>`,
		to: req.body.email,
		subject: `Welcome to eCommerce, ${req.body.email}`,
		template: 'confirm_email',
		context: {
			email: req.body.email
		}
	}
	transporter.sendMail(mailOptions, (err, res) => {
		if (err) console.log(err)
		transporter.close()
	})
})


router.post('/login', async (req, res) => {
	// Validate req.body
	const { errors, isValid } = validateLoginInput(req.body)
	if (!isValid) {
		return res.status(400).json(errors)
	}

	const { email, password } = req.body

	// Check email
	const user = await User.findOne({ email })
	if (!user) {
		errors.email = 'Invalid Email or Password'
		return res.status(400).json(errors)
	}

	// Compare passwords
	const passwordsMatch = await bcrypt.compare(password, user.password)
	if (passwordsMatch) {
		const payload = { 
			id: user.id, 
			name: user.name, 
			lastname: user.lastname, 
			role: user.role,
			email: user.email,
			emailConfirmed: user.emailConfirmed,
			cart: user.cart,
			history: user.history
		}

		jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 }, (err, token) => {
				// if (err) {
				// 	return res.json({
				// 		success: false,
				// 		errors: err
				// 	})
				// }
				res.json({
					success: true,
					token: `Bearer ${token}`	// protocol
				})
			}
		)
	} else {
		errors.password = 'Invalid Email or Password'
		return res.status(400).json(errors) 
	}
})

// @descr: Forget password
router.post('/forget', async (req, res) => {
	// @TODO: validate email

	const foundUser = await User.findOne({ email: req.body.email })
	if (!foundUser) {
		return res.status(403).json({ error: 'User was not found with this email' })
	}

	// @descr: generate resetToken
	const saltRounds = 10
	const genSalt = await bcrypt.genSalt(saltRounds)
	const hash = await bcrypt.hash(foundUser.password, genSalt)
	const pureHash = hash.replace('/', '')

	// @TODO: allow request after 24 hours
	// @descr: Update user's jwt date;
	const updateTokenDate = await User.findOneAndUpdate({ _id: foundUser.id }, { $set: { resetTokenExpires: Date.now() + 86400000, resetToken: pureHash } }, { new: true })
	if (updateTokenDate) {
		transporter.use('compile', hbs({
			viewPath: 'server/config/mails',
			extName: '.hbs'
		}))

		// eslint-disable-next-line eqeqeq
		const protocol = process.env.SSL == true ? 'https://' : 'http://'
		const url = process.env.CLIENT_URL || 'localhost:3000'
		const link = `${protocol}${url}/password-reset/${pureHash}`
		const mailOptions = {
			from: `eCommerce - <${process.env.EMAIL}>`,
			to: req.body.email,
			subject: `Confirm Reset Password, ${req.body.email}`,
			template: 'reset_password',
			context: {
				link,
				email: req.body.email
			}
		}
		transporter.sendMail(mailOptions, (err) => {
			if (err) console.log(err)
			transporter.close()
			res.status(200).json({ success: true })
		})
	}
})

router.post('/reset/:hash', async (req, res) => {
	// @TODO: validate passwords
	
	// @TODO: check if passwords equals

	// @descr: hash req.body.password
	const saltRounds = 10
	const genSalt = await bcrypt.genSalt(saltRounds)
	const newPassword = await bcrypt.hash(req.body.password, genSalt)

	// @TODO: make avaiable to reset for 24 hrs only
	// @descr: Find user by hash from url; update password
	const updatedUser = await User.findOneAndUpdate({ resetToken: req.params.hash }, { $set: { password: newPassword, resetTokenExpires: 0 } }, { new: true })
	if (updatedUser) {
		res.status(200).json({ success: true })
	}
})


// @TODO: change route, refactor that shit
// @descr: upload image to product
router.post('/uploadimage', formidable(), (req, res) => {
	// @TODO: check if user signed in
	
	// @TODO: check if user is admin

	cloudinary.uploader.upload(req.files.file.path, result => {
		res.status(200).send({ 
			public_id: result.public_id,
			url: result.url
		})
	}, {
		public_id: `${Date.now()}`,
		resource_type: 'auto'
	})
})

// @TODO: change route, refactor that shit
router.get('/removeimage', (req, res) => {
	// @TODO: check if user signed in

	// @TODO: check if user is admin
	
	const imageId = req.query.public_id

	cloudinary.uploader.destroy(imageId, (error, result) => {
		if (error) return res.json({ succes: false, error })
		res.status(200).send('ok')
	})
})


router.get('/cart', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const user = await User.findOne({ _id: req.user.id })
	if (!user) {
		return res.status(403).json({ error: 'You must sign in to add products to cart' })
	} 
	return res.status(200).json({ cart: user.cart })	
})

router.get('/cart/full', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const user = await User.findOne({ _id: req.user.id })
	if (!user) {
		return res.status(403).json({ error: 'You must sign in to add products to cart' })
	}

	const items = user.cart.map(product => mongoose.Types.ObjectId(product.id))

	
	const products = await Product
		.find({ _id: { $in: items } })
		.populate('brand')
		.populate('categories')


	res.status(200).json(products)
})

// @TODO: Refactor that
router.post('/cart/:productId', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const user = await User.findOne({ _id: req.user.id })
	if (!user) {
		return res.status(403).json({ error: 'You must sign in to add products to cart' })
	}

	let alreadyInCart = false
	user.cart.forEach(item => {
		// eslint-disable-next-line eqeqeq
		if (item.id == req.params.productId) {
			alreadyInCart = true
		}
	})
	

	// @TODO: Replace to await
	if (alreadyInCart) {	
		User.findOneAndUpdate(
			{
				_id: user.id,
				'cart.id': mongoose.Types.ObjectId(req.params.productId)
			},
			{ $inc: { 'cart.$.quantity': 1 } },
			{ new: true },
			() => {
				res.status(200).json(user.cart)
				console.log('user.cart: ', user.cart)
			}
		)
	} else {
		User.findOneAndUpdate(
			{ _id: user.id }, {
				$push: {
					cart: {
						id: mongoose.Types.ObjectId(req.params.productId), 
						quantity: 1, 
						date: Date.now() 
					}
				}
			}, { new: true },
			(err, doc) => {
				if (err) return res.json({ success: false, err })
				res.status(200).json(doc.cart)
				console.log('doc.cart: ', doc.cart)
			}
		)
	}
})

router.delete('/cart/:productId', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const user = await User.findOne({ _id: req.user.id })
	if (!user) {
		return res.status(403).json({ error: 'You must sign in to add products to cart' })
	}

	await User.findOneAndUpdate({ _id: user.id }, { $pull: { cart: { id: mongoose.Types.ObjectId(req.params.productId) } } }, { new: true })

	return res.status(200).json(req.params.productId)
})

export default router
