import express from 'express'
import passport from 'passport'
import Category from '../../models/Category'	// Load Models
import validateCategoryInput from '../../validation/category'


const router = express.Router()

router.get('/', async (req, res) => {
	try {
		const categories = await Category.find({})
		if (categories) {
			res.status(200).json({
				success: true,
				data: categories
			})
		} else {
			res.status(204).json({
				success: true,
				data: ['No Categories Yet']
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
	const { errors, isValid } = validateCategoryInput(req.body)
	if (!isValid) { return res.status(400).json({ errors }) }

	// Save
	const category = new Category({
		categoryName: req.body.categoryName
	})

	category.save()
		.then(categ => {
			res.json({
				success: true,
				data: categ
			})
		})
		.catch(err => {
			res.json({
				success: false,
				errors: err
			})
		})
})

export default router

