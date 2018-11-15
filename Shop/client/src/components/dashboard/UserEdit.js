import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import TextFieldGroup from '../common/TextFieldGroup'
import { updateUser } from '../../actions/authActions'

class UserEdit extends Component {
	state = {
		name: '',
		lastname: '',
		email: '',
		errors: {},
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit = e => {
		e.preventDefault()

		const userData = {
			name: this.state.name,
			lastname: this.state.lastname,
			email: this.state.email,
		}
		console.log('userData: ', userData)
		this.props.updateUser(this.props.auth.user.id, userData, this.props.history)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors })
		}
	}

	render() {
		const { errors } = this.state

		const { name, lastname, email } = this.props.auth.user
		return (
			<Dashboard>
				<div className="add_product_panel">
					<h1 className="add_product_panel_title">Edit Info</h1>
					<form noValidate onSubmit={this.onSubmit}>
						<div className="form-group">
							<label htmlFor="name">First Name</label>
							<TextFieldGroup
								placeholder={name}
								name="name"
								type="text"
								id="name"
								defaultValue={name}
								value={this.state.name}
								onChange={this.onChange}
								error={errors.name}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="lastname">Last Name</label>
							<TextFieldGroup
								placeholder={lastname}
								name="lastname"
								type="text"
								id="lastname"
								value={this.state.lastname}
								onChange={this.onChange}
								error={errors.lastname}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<TextFieldGroup
								placeholder={email}
								name="email"
								type="text"
								id="email"
								value={this.state.email}
								onChange={this.onChange}
								error={errors.email}
							/>
						</div>
						<button type="submit" className="btn btn-primary">
							Save
						</button>
						<Link to="/user/dashboard">
							<button type="button" className="btn btn_secodanry">
								Cancel
							</button>
						</Link>
					</form>
				</div>
			</Dashboard>
		)
	}
}

const mapStateToProps = state => {
	console.log('state: ', state)
	return {
		auth: state.auth,
	}
}

export default connect(
	mapStateToProps,
	{ updateUser }
)(UserEdit)
