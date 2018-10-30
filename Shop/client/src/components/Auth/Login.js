import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../../redux/actions/user_actions'

import TextFieldGroup from '../common/TextFieldGroup'

class Login extends Component {
	constructor() {
		super()

		this.state = {
			email: '',
			password: '',
			errors: {},
			passwordClientError: '',
			emailClientError: '',
		}
		this.onSubmit = this.onSubmit.bind(this)
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}
	onSubmit(e) {
		e.preventDefault()
		const userData = {
			email: this.state.email,
			password: this.state.password,
		}

		this.props.loginUser(userData)

		console.log('onSubmit props: ', this.props)
		// @descr: Client Validation
		// if (this.state.password.length < 8) {
		// 	this.setState({
		// 		passwordClientError: 'Password must be more than 8 characters',
		// 	})
		// } else if (
		// 	!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
		// ) {
		// 	this.setState({ emailClientError: 'Email is not valid' })
		// } else {
		// 	// @descr: run action creator; async post req to server;
		// 	this.props.loginUser(userData)
		// }
	}

	// @descr: check global storage prop
	componentDidMount() {
		console.log('props:', this.props)
		// 	if (this.props.auth.isAuthenticated) {
		// 		this.props.history.push('/')
		// 	} else {
		// 		console.log('props', this.props)
		// 	}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/')
		}
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors })
		}
	}

	render() {
		return (
			<div className="page_wrapper">
				<div className="container h-100">
					<div className="row h-100 justify-content-center align-items-center">
						<div className="col-12">
							<div className="signin_wrapper">
								<h1>Sign In</h1>
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
											error={
												this.state.errors.email || this.state.emailClientError
											}
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
											error={
												this.state.errors.password ||
												this.state.passwordClientError
											}
										/>
									</div>
									<button
										type="submit"
										className="btn btn-block btn-primary mt-5"
									>
										Fine, let me in
									</button>
								</form>
							</div>
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
