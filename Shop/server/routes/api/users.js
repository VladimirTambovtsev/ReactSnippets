import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'
// File Upload
import cloudinary from 'cloudinary'
import formidable from 'express-formidable'

import User from '../../models/User'	// Load Models
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


router.post('/uploadimage', formidable(), (req, res) => {
	// @TODO: check if user signed in
	
	// @TODO: check if user is admin

	cloudinary.uploader.upload(req.files.file.path, result => {
		console.log('result: ', result)
		res.status(200).send({ 
			public_id: result.public_id,
			url: result.url
		})
	}, {
		public_id: `${Date.now()}`,
		resource_type: 'auto'
	})
})


router.get('/removeimage', (req, res) => {
	// @TODO: check if user signed in

	// @TODO: check if user is admin
	
	const imageId = req.query.public_id

	cloudinary.uploader.destroy(imageId, (error, result) => {
		if (error) return res.json({ succes: false, error })
		res.status(200).send('ok')
	})
})

export default router
