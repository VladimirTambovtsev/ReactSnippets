import express from 'express'
import passport from 'passport'
import Category from '../../models/Category'	// Load Models
import User from '../../models/User'	// Load Models
import validateCategoryInput from '../../validation/category'


const router = express.Router()

router.get('/', async (req, res) => {
	try {
		const categories = await Category.find({})
		if (categories) {
			res.status(200).json(categories)
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

router.post('/add', passport.authenticate('jwt', { session: false }), async (req, res) => {
	// Check role
	const user = await User.findOne({ _id: req.user._id })
	if (user.role !== 1) {
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
		.then(categories => {
			res.json(categories)
		})
		.catch(err => {
			res.json({
				success: false,
				errors: err
			})
		})
})

export default router

