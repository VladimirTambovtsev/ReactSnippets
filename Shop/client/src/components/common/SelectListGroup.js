import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const SelectListGroup = ({
	name,
	placeholder,
	value,
	label,
	id,
	error,
	options,
	onChange,
	info,
}) => {
	const selectOptions = options.map(option => (
		<option key={option.label} value={option.value}>
			{option.label}
		</option>
	))
	return (
		<div>
			<select
				className={classnames('form-control', { 'is-invalid': error })}
				name={name}
				value={value}
				id={id}
				onChange={onChange}
			>
				{selectOptions}
			</select>
			{error && <div className="invalid-feedback">{error}</div>}
			<small className="text-muted">{info}</small>
		</div>
	)
}

SelectListGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	label: PropTypes.string,
	id: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired,
	info: PropTypes.string,
}

export default SelectListGroup
