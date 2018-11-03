import express from 'express'
import passport from 'passport'
import Brand from '../../models/Brand'	// Load Models
import validateBrandInput from '../../validation/brand'


const router = express.Router()

router.get('/', async (req, res) => {
	try {
		const brands = await Brand.find({})
		if (brands) {
			res.status(200).json(brands)
		} else {
			res.status(204).json({
				success: true,
				data: ['No Brands Yet']
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
	const { errors, isValid } = validateBrandInput(req.body)
	if (!isValid) { return res.status(400).json({ errors }) }

	// @TODO: check product image

	// Save
	const brand = new Brand({
		brandName: req.body.brandName
	})

	brand.save()
		.then(doc => {
			res.json({
				success: true,
				data: doc
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

	const brand = await Brand.findById(req.params.id)
	if (brand) {
		brand.remove()
			.then(() => res.json({ success: true }))
			.catch(err => res.send(500).send({ errors: err }))
	} else {
		res.status(204).json({
			success: true,
			data: ['No Brand Found with this ID']
		})
	}
})

export default router
