import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
	return (
		<div className="btn-group mb-4">
			<Link to="/profile/edit" className="btn btn-light">
				<i className="fas fa-user-circle text-info mr-1" /> Edit Profile
			</Link>
			<Link to="/experience/create" className="btn btn-light">
				<i className="fab fa-black-tie text-info mr-1" /> Add Experience
			</Link>
			<Link to="/education/create" className="btn btn-light">
				<i className="fas fa-graduation-cap text-info mr-1" /> Add Education
			</Link>
		</div>
	);
};

export default ProfileActions;