import Validator from 'validator'
import isEmpty from './is-empty'

/* eslint-disable no-param-reassign */
module.exports = function validateBrandInput(data) {
	const errors = {}

	data.brandName = !isEmpty(data.brandName) ? data.brandName : ''
	
	
	// Product Name
	if (!Validator.isLength(data.brandName, { max: 100 })) {
		errors.brandName = 'Brand Name must be less than 100 cahracters'
	}
	if (Validator.isEmpty(data.brandName)) {
		errors.brandName = 'Text field is required'
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}
/* eslint-disable no-param-reassign */
