import Validator from 'validator'
import isEmpty from './is-empty'

/* eslint-disable no-param-reassign */
module.exports = function validateProductInput(data) {
	const errors = {}

	data.productName = !isEmpty(data.productName) ? data.productName : ''
	data.description = !isEmpty(data.description) ? data.description : ''
	
	// Product Name
	if (!Validator.isLength(data.productName, { max: 80 })) {
		errors.productName = 'Product Name must be less than 80 cahracters'
	}
	if (Validator.isEmpty(data.productName)) {
		errors.productName = 'Text field is required'
	}

	// Product Description
	if (!Validator.isLength(data.description, { max: 2000 })) {
		errors.description = 'Product description must be less than 2000 cahracters'
	}
	if (Validator.isEmpty(data.description)) {
		errors.description = 'Description field is required'
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}
/* eslint-disable no-param-reassign */
