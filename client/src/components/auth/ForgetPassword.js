import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import { loginUser } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'

class ForgetPassword extends Component {
	state = {
		email: '',
		errors: '',
		success: false,
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}
	onSubmit = e => {
		e.preventDefault()
		const userData = {
			email: this.state.email,
		}

		// @TODO: receive error if user's email is not found

		axios
			.post('/api/users/forget', userData)
			.then(res => this.setState({ success: true }))
			.catch(err => this.setState({ errors: 'Error sending Email' }))
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
							<h1 className="text-center display-4">Forget Password?</h1>
							{this.state.success === true ? (
								<p className="text-success">
									Email was sent successfully. Please, check your Email
								</p>
							) : (
								<p className="text-center">
									Enter your Email to reset your password
								</p>
							)}
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
	)(ForgetPassword)
)
