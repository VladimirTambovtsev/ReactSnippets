import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

import { createProfile, getCurrentProfile }  from '../../actions/profileActions';

import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {
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

		// Get previous values of user
		if (nextProps.profile.profile) {
			const profile = nextProps.profile.profile;

			// Bring skills array back to CSV
			const skillsCSV = profile.skills.join(',');

			// If profile field doesn't exist, make empty string
			profile.status = !isEmpty(profile.status) ? profile.status : '';
			profile.company = !isEmpty(profile.company) ? profile.company : '';
			profile.website = !isEmpty(profile.website) ? profile.website : '';
			profile.location = !isEmpty(profile.location) ? profile.location : '';
			profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
			profile.bio = !isEmpty(profile.bio) ? profile.bio : '';

			profile.social = !isEmpty(profile.social) ? profile.social : {};
			profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
			profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
			profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
			profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
			profile.vk = !isEmpty(profile.social.vk) ? profile.social.vk : '';

			// Set component fields state
			this.setState({
				skills: skillsCSV,
				status: profile.status,
				company: profile.company,
				handle: profile.handle,
				website: profile.website,
				location: profile.location,
				githubusername: profile.githubusername,
				bio: profile.bio,
				twitter: profile.twitter,
				facebook: profile.facebook,
				linkedin: profile.linkedin,
				youtube: profile.youtube,
				vk: profile.vk
			});
		}
	}

	componentDidMount() {
		this.props.getCurrentProfile();
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
							<h1 className="display-4 text-center">Edit Profile</h1>
							<p className="lead text-center">Edit your profile's information</p>
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
								<button type="submit" className="btn btn-block btn-primary">Submit</button>
							</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


EditProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));


