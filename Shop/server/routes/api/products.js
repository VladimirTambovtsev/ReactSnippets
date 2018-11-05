import express from 'express'
import passport from 'passport'
import Product from '../../models/Product'	// Load Models
import User from '../../models/User'	// Load Models
import validateProductInput from '../../validation/product'


const router = express.Router()


router.get('/', async (req, res) => {
	try {
		const products = await Product.find({})
		if (products) {
			res.status(200).json(products)
		} else {
			res.status(204).json({
				success: true,
				data: ['No Products Yet']
			})
		}
	} catch (err) {
		res.status(500).send({ errors: err })
	}
})

// @desc: Sort by 'sold' field (most byuing products)
router.get('/popular', async (req, res) => {
	const limit = 100

	try {
		/*eslint quote-props: ["error", "consistent"]*/
		const products = await Product.find({})	// { createdOn: { $lte: req.createdOnBefore } }
			.limit(limit)
			.sort({ 'sold': 'descending' })

		if (products) {
			res.status(200).json(products)
		} else {
			res.status(204).json({
				success: true,
				data: ['No Such Products']
			})
		}
	} catch (err) {
		res.status(500).send({ errors: err })
	}
})

// @desc: New Products
router.get('/hot', async (req, res) => {
	const limit = 50

	try {
		/*eslint quote-props: ["error", "consistent"]*/
		const products = await Product.find({})
			.limit(limit)
			.sort({ 'createdAt': 'descending' })

		if (products) {
			res.status(200).json({
				success: true,
				data: products
			})
		} else {
			res.status(204).json({
				success: true,
				data: ['No Such Products']
			})
		}
	} catch (err) {
		res.status(500).send({ errors: err })
	}
})

router.get('/:id', async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
			.populate('brand')
			.populate('categories')

		if (product) {
			res.status(200).json(product)
		} else {
			res.status(404).json({
				success: true,
				data: ['No Such Product']
			})
		}
	} catch (err) {
		res.status(500).send({ errors: err })
	}
})

// @desc: Post filters to get necessary products
router.post('/filtered', (req, res) => {
	const order = req.body.order ? req.body.order : 'desc'
	const sortBy = req.body.sortBy ? req.body.sortBy : '_id'
	const filters = req.body.filters
	const limit = req.body.limit ? parseInt(req.body.limit) : 100
	const skip = parseInt(req.body.skip)
	const findArgs = {}

	// @TODO: refactor that shit
	for (const key in filters) {
		if (filters[key].length > 0) {
			if (key === 'price') {
				findArgs[key] = {
					$gte: filters[key][0],
					$lte: filters[key][1]
				}
			} else {
				// @TODO: fix category bug
				findArgs[key] = req.body.filters[key]
			}
		}
	}
	findArgs.publish = true

	Product.find(findArgs)
		// .populate('brand')
		// .populate('category')
		.sort([[sortBy, order]])
		.skip(skip)
		.limit(limit)
		.exec((err, articles) => {
			if (err) return res.status(400).send(err)
			res.status(200).json({ size: articles.length, articles })
		})
})

// @desc: Add product to shop
router.post('/add', passport.authenticate('jwt', { session: false }), async (req, res) => {
	// Check role
	const user = await User.findOne({ _id: req.user._id })
	if (user.role !== 1) {
		return res.status(403).json({ errors: 'No Access Rights' })
	}

	// Check validation
	const { errors, isValid } = validateProductInput(req.body)
	if (!isValid) {
		return res.status(400).json(errors)
	}

	// @TODO: Validate Felds

	// @TODO: check for UNIQUE producName

	// Save
	const product = new Product({
		productName: req.body.productName,
		price: req.body.price,
		description: req.body.description,
		shipping: req.body.shipping,
		available: req.body.available,
		brand: req.body.brand,
		categories: req.body.categories,
		frets: req.body.frets,
		sold: req.body.sold,
		publish: req.body.publish,
		images: req.body.images
	})

	product.save()
		.then(prod => {
			res.json({
				success: true,
				data: prod
			})
		})
		.catch(err => {
			res.json({
				success: false,
				errors: err
			})
		})
})


// @desc: Delete product
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	// Check role
	const user = await User.findOne({ _id: req.user._id })
	if (user.role !== 1) {
		return res.status(403).json({ errors: 'No Access Rights' })
	}

	const product = await Product.findById(req.params.id)
	if (product) {
		product.remove()
			.then(() => res.json({ success: true }))
			.catch(err => res.send(500).send({ errors: err }))
	} else {
		res.status(204).json({
			success: true,
			data: ['No Product Found with this ID']
		})
	}
})

export default router
