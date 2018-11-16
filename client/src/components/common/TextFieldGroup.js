import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const TextFieldGroup = ({
	name,
	placeholder,
	value,
	id,
	error,
	type,
	onChange,
	disabled,
	info,
}) => {
	return (
		<div>
			<input
				className={classnames('form-control', { 'is-invalid': error })}
				type={type}
				placeholder={placeholder}
				name={name}
				value={value}
				disabled={disabled}
				id={id}
				onChange={onChange}
			/>
			{error && <div className="invalid-feedback">{error}</div>}
			<small className="text-muted">{info}</small>
		</div>
	)
}

TextFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	id: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.string,
	info: PropTypes.string,
}

TextFieldGroup.defaultProps = {
	type: 'text',
}

export default TextFieldGroup
