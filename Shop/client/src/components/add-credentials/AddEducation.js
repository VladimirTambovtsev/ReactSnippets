import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup  from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			school: '',
			degree: '',
			fieldofstudy: '',
			from: '',
			to: '',
			current: false,
			description: '',
			errors: {},
			disabled: false
		};	
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onCheck = this.onCheck.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) this.setState({ errors: nextProps.errors });
	}

	onSubmit(e) {
		e.preventDefault();

		const edData = {
			school: this.state.school,
			degree: this.state.degree,
			fieldofstudy: this.state.fieldofstudy,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		}

		this.props.addEducation(edData, this.props.history);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	onCheck() {
		this.setState({
			current: !this.state.current,
			disabled: !this.state.disabled
		});
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="add-education">
			<Link to="/dashboard" className="btn btn-light text-muted">Go back</Link>
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
				
							<h1 className="display-4 text-center">Add Education</h1>
							<p className="lead text-center">Add college that you have had in the past or current</p>
							<form onSubmit={this.onSubmit} className="mt-5">
								<div className="form-group">
									<TextFieldGroup 
										placeholder="School"
										name="school"
										value={this.state.school}
										onChange={this.onChange}
										error={errors.school}
									/>
								</div>
								<div className="form-group">
									<TextFieldGroup 
										placeholder="Degree"
										name="degree"
										value={this.state.degree}
										onChange={this.onChange}
										error={errors.degree}
									/>
								</div>
								<div className="form-group">
									<TextFieldGroup 
										placeholder="Field of Study"
										name="fieldofstudy"
										value={this.state.fieldofstudy}
										onChange={this.onChange}
										error={errors.fieldofstudy}
									/>
								</div>
								<div className="form-group">
								<h6>From Date</h6>
									<TextFieldGroup 
										name="from"
										type="date"
										value={this.state.from}
										onChange={this.onChange}
										error={errors.from}
									/>
								</div>
								<div className="form-group">
								<h6>To Date</h6>
									<TextFieldGroup 
										name="to"
										type="date"
										value={this.state.to}
										onChange={this.onChange}
										error={errors.to}
										disabled={this.state.disabled ? 'disabled' : ''}
									/>
								</div>
								<div className="form-group form-check">
									<input 
										type="checkbox" 
										className="form-check-input"
										name="current"
										value={this.state.current}
										checked={this.state.current}
										onChange={this.onCheck}
										id="current"
									/>
									<label htmlFor="current" className="form-check-label">Current Job</label>
								</div>
								<div className="form-group">
									<TextAreaFieldGroup
										placeholder="Job Description"
										name="description"
										value={this.state.description}
										onChange={this.onChange}
										error={errors.description}
										info="Tell us about the program that you were in"
									/>
								</div>
								<div className="form-group mt-5 mb-5">
									<button className="btn btn-primary btn-block">Save</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));

