import Validator from 'validator'
import isEmpty from './is-empty'


/* eslint-disable no-param-reassign */
export default function validateLoginInput(data) {
	const errors = {}

	data.email = !isEmpty(data.email) ? data.email : ''
	data.password = !isEmpty(data.password) ? data.password : ''


	if (Validator.isEmpty(data.email)) {
		errors.email = 'Email field is required'
	}

	if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid'
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password is required'
	}

	if (!Validator.isLength(data.password, { min: 8, max: 150 })) {
		errors.password = 'Password must be at least 8 characters'
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}
/* eslint-disable no-param-reassign */
