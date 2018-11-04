import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const TextAreaFieldGroup = ({
	name,
	placeholder,
	value,
	id,
	error,
	onChange,
	info,
	style,
}) => {
	return (
		<div>
			<textarea
				className={classnames('form-control textarea', { 'is-invalid': error })}
				placeholder={placeholder}
				name={name}
				value={value}
				id={id}
				onChange={onChange}
			/>
			{error && <div className="invalid-feedback">{error}</div>}
			<small className="text-muted">{info}</small>
		</div>
	)
}

TextAreaFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	id: PropTypes.string,
	error: PropTypes.string,
	info: PropTypes.string,
	onChange: PropTypes.func.isRequired,
}

export default TextAreaFieldGroup
