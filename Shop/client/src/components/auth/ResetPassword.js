import React, { Component } from 'react'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'

class ResetPassword extends Component {
	state = {
		password: '',
		password2: '',
		errors: {},
		success: false,
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}
	onSubmit = e => {
		e.preventDefault()

		if (this.state.password !== this.state.password2) {
			this.setState({ errors: { password2: 'Passwords do not match' } })
		} else if (
			this.state.password.length < 8 ||
			this.state.password2.length < 8
		) {
			this.setState({
				errors: { password2: 'Password must be more than 8 characters' },
			})
		} else {
			const userData = { password: this.state.password }

			axios
				.post(`/api/users/reset/${this.props.match.params.hash}`, userData)
				.then(
					res =>
						res.data.success
							? this.setState({
									success: true,
							  })
							: null
				)
				.catch(err => console.log('err: ', err))
		}
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
							{this.state.success === true ? (
								<p className="text-success">
									Password was changed successfully
								</p>
							) : (
								<p className="text-center">Enter your new password</p>
							)}
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

								{this.state.success === true ? (
									<Link to="/signin">
										<button type="button">Go to Login Page</button>
									</Link>
								) : (
									<button
										type="submit"
										className="btn btn-block btn-primary mt-5"
									>
										Save new password
									</button>
								)}
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

export default withRouter(connect(mapStateToProps)(ResetPassword))
