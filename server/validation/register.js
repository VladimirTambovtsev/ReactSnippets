import Validator from 'validator'
import isEmpty from './is-empty'


/* eslint-disable no-param-reassign */
export default function validateRegisterInput(data) {
	const errors = {}

	data.name = !isEmpty(data.name) ? data.name : ''
	data.lastname = !isEmpty(data.lastname) ? data.lastname : ''
	data.email = !isEmpty(data.email) ? data.email : ''
	data.password = !isEmpty(data.password) ? data.password : ''
	data.password2 = !isEmpty(data.password2) ? data.password2 : ''

	// Name
	if (!Validator.isLength(data.name, { min: 1, max: 30 })) {
		errors.name = 'Name must be less than 30 characters'
	}

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Name is required'
	}

	// Lastname
	if (!Validator.isLength(data.lastname, { min: 1, max: 80 })) {
		errors.lastname = 'Lastname must be less than 80 characters'
	}

	if (Validator.isEmpty(data.lastname)) {
		errors.lastname = 'Lastname is required'
	}

	// Email
	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required'
	}

	if (!Validator.isLength(data.email, { max: 100 })) {
		errors.email = 'Email must be less than 100 characters'
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid'
	}

	// Password
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password is required'
	}

	if (!Validator.isLength(data.password, { min: 8, max: 150 })) {
		errors.password = 'Password must be at least 8 characters'
	}

	if (Validator.isEmpty(data.password2)) {
		errors.password2 = 'Password is required'
	}

	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = 'Passwords must match'
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}
/* eslint-enable no-param-reassign */
