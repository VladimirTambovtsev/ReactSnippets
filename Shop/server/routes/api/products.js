import express from 'express'
import passport from 'passport'
import Product from '../../models/Product'	// Load Models
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
		// @TODO: Add pagination
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
		// @TODO: Add pagination
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
			res.status(200).json({
				success: true,
				data: product
			})
		} else {
			res.status(204).json({
				success: true,
				data: ['No Such Product']
			})
		}
	} catch (err) {
		res.status(500).send({ errors: err })
	}
})


router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
	// Check role
	if (req.user.role !== 1) {
		return res.status(403).json({ errors: 'No Access Rights' })
	}

	// Check validation
	const { errors, isValid } = validateProductInput(req.body)
	if (!isValid) { return res.status(400).json({ errors }) }

	// @TODO: Validate Felds

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
	if (req.user.role !== 1) {
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
