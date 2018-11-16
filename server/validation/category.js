import Validator from 'validator'
import isEmpty from './is-empty'

/* eslint-disable no-param-reassign */
module.exports = function validateCategoryInput(data) {
	const errors = {}

	data.categoryName = !isEmpty(data.categoryName) ? data.categoryName : ''
	
	// Category Name
	if (!Validator.isLength(data.categoryName, { max: 80 })) {
		errors.categoryName = 'Product\'s Category must be less than 80 cahracters'
	}
	if (Validator.isEmpty(data.categoryName)) {
		errors.categoryName = 'Text field is required'
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}
/* eslint-disable no-param-reassign */
