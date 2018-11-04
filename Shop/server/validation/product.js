import Validator from 'validator'
import isEmpty from './is-empty'

/* eslint-disable no-param-reassign */
module.exports = function validateProductInput(data) {
	const errors = {}

	data.productName = !isEmpty(data.productName) ? data.productName : ''
	data.price = !isEmpty(data.price) ? data.price : ''
	data.description = !isEmpty(data.description) ? data.description : ''
	
	// Product Name
	if (!Validator.isLength(data.productName, { max: 80 })) {
		errors.productName = 'Product Name must be less than 80 cahracters'
	}
	if (Validator.isEmpty(data.productName)) {
		errors.productName = 'Text field is required'
	}

	// Product Price
	if (!Validator.isNumeric(data.price)) {
		errors.price = 'Price field is required'
	}


	// Product Description
	if (!Validator.isLength(data.description, { max: 2000 })) {
		errors.description = 'Product description must be less than 2000 cahracters'
	}
	if (Validator.isEmpty(data.description)) {
		errors.description = 'Description field is required'
	}

	// Shipping
	if (typeof data.shipping !== 'boolean') {
		errors.shipping = 'Shipping must be true of false'
	}
	if (data.shipping === '') {
		errors.shipping = 'Shipping field is required'
	}
	
	// Available
	if (typeof data.available !== 'boolean') {
		errors.available = 'Avalable field must be true of false'
	}
	
	// Product Brand
	if (Validator.isEmpty(data.brand)) {
		errors.brand = 'Brand field is required'
	}

	// Category brand
	if (Validator.isEmpty(data.categories)) {
		errors.categories = 'Category field is required'
	}

	// Frets
	if (!Validator.isNumeric(data.frets)) {
		errors.frets = 'Frets field must be in number type'
	}

	// Publish
	if (typeof data.publish !== 'boolean') {
		errors.publish = 'Publish field is required'
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}
/* eslint-disable no-param-reassign */
