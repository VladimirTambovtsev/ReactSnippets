import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

import { createProfile }  from '../../actions/profileActions';

class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: '',
			status: '',
			location: '',
			skills: '',
			githubusername: '',
			bio: '',
			twitter: '',
			facebook: '',
			linkedin: '',
			youtube: '',
			vk: '',
			company: '',
			website: '',
			errors: {}
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) this.setState({ errors: nextProps.errors });
	}

	onSubmit(e) {
		e.preventDefault();

		const profileData = {
			handle: this.state.handle,
			status: this.state.status,
			location: this.state.location,
			skills: this.state.skills,
			githubusername: this.state.githubusername,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			youtube: this.state.youtube,
			vk: this.state.vk,
			company: this.state.company,
			website: this.state.website,
			errors: this.state.errors
		};

		this.props.createProfile(profileData, this.props.history);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })		
	}

	render() {
		const { errors, displaySocialInputs } = this.state;

		let socialInputs;

		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup 
						placeholder="Twitter profile URL"
						name="twitter"
						icon="fab fa-twitter"
						value={this.state.twitter}
						onChange={this.onChange}
						error={errors.twitter}
					/>
					<InputGroup 
						placeholder="Facebook profile URL"
						name="facebook"
						icon="fab fa-facebook"
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}
					/>
					<InputGroup 
						placeholder="Linkedin profile URL"
						name="linkedin"
						icon="fab fa-linkedin"
						value={this.state.linkedin}
						onChange={this.onChange}
						error={errors.linkedin}
					/>
					<InputGroup 
						placeholder="Youtube profile URL"
						name="youtube"
						icon="fab fa-youtube"
						value={this.state.youtube}
						onChange={this.onChange}
						error={errors.youtube}
					/>
					<InputGroup 
						placeholder="Vk profile URL"
						name="vk"
						icon="fab fa-vk"
						value={this.state.vk}
						onChange={this.onChange}
						error={errors.vk}
					/>
				</div>
			);
		} 

		// select options for status
		const options = [
			{ label: 'Select Professional Status', value: 0 },
			{ label: 'Developer', value: 'Developer' },
			{ label: 'Manager', value: 'Manager' },
			{ label: 'Student', value: 'Student' },
			{ label: 'Intern', value: 'Intern' }
		];
		return( 
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Create Your Profile</h1>
							<p className="lead text-center">Add some information to make your profile available</p>
							<form onSubmit={this.onSubmit} className="mt-5">
							<div className="form-group">
								<TextFieldGroup
									placeholder="Profile Handle"
									name="handle"
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info="A unique handle for your profile URL."
								/>
							</div>
							<div className="form-group">
								<SelectListGroup
									placeholder="Status"
									name="status"
									value={this.state.status}
									onChange={this.onChange}
									error={errors.status}
									options={options}
									info="Your current status"
								/>
							</div>
							<div className="form-group">
								<TextFieldGroup
									placeholder="Company"
									name="company"
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}
									info="Your current company"
								/>
							</div>
							<div className="form-group">
								<TextFieldGroup
									placeholder="Website"
									name="website"
									value={this.state.website}
									onChange={this.onChange}
									error={errors.website}
									info="Website"
								/>
							</div>
							<div className="form-group">
								<TextFieldGroup
									placeholder="Location"
									name="location"
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
									info="Location"
								/>
							</div>
							<div className="form-group">
								<TextFieldGroup
									placeholder="Skills"
									name="skills"
									value={this.state.skills}
									onChange={this.onChange}
									error={errors.skills}
									info='Please, use comma separated values (eg: "HTML, CSS, PHP")'
								/>
							</div>
							<div className="form-group">
								<TextFieldGroup
									placeholder="Github Username"
									name="githubusername"
									value={this.state.githubusername}
									onChange={this.onChange}
									error={errors.githubusername}
									info="If you want latest repos, add your profile"
								/>
							</div>
							<div className="form-group">
								<TextFieldGroup
									placeholder="Bio"
									name="bio"
									value={this.state.bio}
									onChange={this.onChange}
									error={errors.bio}
									info="Tell about youtself"
								/>
							</div>
							<div className="form-group">
								<button type="button"
									onClick={() => {
										this.setState(prevState => ({
											displaySocialInputs: !prevState.displaySocialInputs
										}))
									}}
									className="btn btn-light text-muted mb-5">
									+ Add Social Links
								</button>
							</div>
							{socialInputs}
							<div className="form-group">
								<button className="btn btn-block btn-primary">Submit</button>
							</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));


