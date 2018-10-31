import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	onSubmit(e) {
		e.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};
		
		// put to redux
		this.props.registerUser(newUser, this.props.history);

	}
	componentDidMount() {	// If user log in => go to '/dashboard'
		if (this.props.auth.isAuthenticated) this.props.history.push('/dashboard');
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({errors: nextProps.errors});
		}
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="text-center display-4">Sign Up</h1>
			 				<p className="text-center">Create a new profile today</p>
			 				<form noValidate onSubmit={this.onSubmit}>
			 				  <div className="form-group">
							    <label htmlFor="exampleInputText1">Your Name</label>
							    <TextFieldGroup 
							    	placeholder="Enter Name"
							    	name="name" type="text" 
							    	id="exampleInputText1"
							    	value={this.state.name}
							    	onChange={this.onChange}
							    	error={errors.name}
							    />
							  </div>

							  <div className="form-group">
							    <label htmlFor="exampleInputEmail1">Email address</label>
							     <TextFieldGroup 
							    	placeholder="Enter email"
							    	name="email" type="email" 
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
							    	name="password" type="password" 
							    	id="exampleInputPassword1"
							    	value={this.state.password}
							    	onChange={this.onChange}
							    	error={errors.password}
							    />
							  </div>

							  <div className="form-group">
							    <label htmlFor="exampleInputPassword2">Repeat your Password</label>
							    <TextFieldGroup 
							    	placeholder="Confirm Password"
							    	name="password2" type="password" 
							    	id="exampleInputPassword2"
							    	value={this.state.password2}
							    	onChange={this.onChange}
							    	error={errors.password2}
							    />
							  </div>
							  <button type="submit" className="btn btn-primary mt-4">Create an account</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));


