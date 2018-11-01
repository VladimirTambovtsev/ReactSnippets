import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'

import TextFieldGroup from '../common/TextFieldGroup'

class Login extends Component {
	constructor() {
		super()
		this.state = {
			email: '',
			password: '',
			errors: {},
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}
	onSubmit(e) {
		e.preventDefault()
		const userData = {
			email: this.state.email,
			password: this.state.password,
		}

		this.props.loginUser(userData)
	}
	componentDidMount() {
		// If user log in => go to '/dashboard'
		console.log('props: ', this.props)
		if (this.props.auth.isAuthenticated)
			this.props.history.push('/user/dashboard')
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/user/dashboard')
		}
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors })
		}
	}

	render() {
		const { errors } = this.state

		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="text-center display-4">Log in</h1>
							<p className="text-center">We're glad to see you again</p>
							<form noValidate onSubmit={this.onSubmit}>
								<div className="form-group">
									<label htmlFor="exampleInputEmail1">Email address</label>
									<TextFieldGroup
										placeholder="Enter email"
										name="email"
										type="email"
										id="exampleInputEmail1"
										value={this.state.email}
										onChange={this.onChange}
										error={errors.email}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="exampleInputPassword1">Password</label>
									<TextFieldGroup
										placeholder="Password"
										name="password"
										type="password"
										id="exampleInputPassword1"
										value={this.state.password}
										onChange={this.onChange}
										error={errors.password}
									/>
								</div>

								<button
									type="submit"
									className="btn btn-block btn-primary mt-5"
								>
									Fine, Let me in
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
})

export default connect(
	mapStateToProps,
	{ loginUser }
)(Login)
