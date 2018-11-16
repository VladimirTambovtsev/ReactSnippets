import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'

class ResetPassword extends Component {
	state = {
		password: '',
		password2: '',
		errors: {},
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}
	onSubmit = e => {
		e.preventDefault()
		const userData = {
			email: this.state.email,
		}

		console.log(userData)
		// this.props.loginUser(userData)
	}

	componentDidMount() {
		// If user log in => go to '/dashboard'
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
							<h1 className="text-center display-4">Set new password</h1>
							<p className="text-center">
								Enter your Email to reset your password
							</p>
							<form noValidate onSubmit={this.onSubmit}>
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
								<div className="form-group">
									<label htmlFor="exampleInputPassword2">
										Confirm Password
									</label>
									<TextFieldGroup
										placeholder="Confirm Password"
										name="password2"
										type="password"
										id="exampleInputPassword2"
										value={this.state.password2}
										onChange={this.onChange}
										error={errors.password2}
									/>
								</div>

								<button
									type="submit"
									className="btn btn-block btn-primary mt-5"
								>
									Send message to Email
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
})

export default withRouter(
	connect(
		mapStateToProps,
		{ loginUser }
	)(ResetPassword)
)
