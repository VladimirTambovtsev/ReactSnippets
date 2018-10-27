import express from 'express'
import passport from 'passport'
import Product from '../../models/Product'	// Load Models
import validateProductInput from '../../validation/product'


const router = express.Router()

router.get('/', async (req, res) => {
	try {
		const products = await Product.find({})
		if (products) {
			res.status(200).json({
				success: true,
				data: products
			})
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

router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
	// Check role
	if (req.user.role !== 1) {
		return res.status(403).json({ errors: 'No Access Rights' })
	}

	// Check validation
	const { errors, isValid } = validateProductInput(req.body)
	if (!isValid) { return res.status(400).json({ errors }) }

	// @TODO: check product image

	// Save
	const product = new Product({
		productName: req.body.productName,
		description: req.body.description
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
