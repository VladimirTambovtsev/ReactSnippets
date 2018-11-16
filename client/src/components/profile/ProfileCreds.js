import React, { Component } from 'react';
import Moment from 'react-moment';

class ProfileCreds extends Component {
	render() {
		const { experience, education } = this.props;
		
		const expItems = experience.map(({_id, title, location, description, company, from ,to}) => (
			<li key={_id} className="list-group-item">
				<h4>{company}</h4>
				<p>
					<strong>Date: </strong><Moment format="YYYY/MM/DD">{from}</Moment> - 
					{to === null ? (' Now') : (<Moment format="YYYY/MM/DD">{to}</Moment>)}
				</p>
				<p><strong>Position: </strong> {title}</p>
				<p>{location === '' ? null : (<span><strong>Location: </strong>{location}</span>)}</p>
				<p>{description === '' ? null : (<span><strong>Description: </strong>{description}</span>)}</p>
				<p></p>
			</li>
		));
		const eduItems = education.map(({_id, school, degree, description, fieldofstudy, from ,to}) => (
			<li key={_id} className="list-group-item">
				<h4>{school}</h4>
				<p>
					<strong>Date: </strong><Moment format="YYYY/MM/DD">{from}</Moment> - 
					{to === null ? (' Now') : (<Moment format="YYYY/MM/DD">{to}</Moment>)}
				</p>
				<p><strong>Degree: </strong> {degree}</p>
				<p><strong>Filed of study: </strong> {fieldofstudy}</p>
				<p>{description === '' ? null : (<span><strong>Description: </strong>{description}</span>)}</p>
				<p></p>
			</li>
		));

		return (
			<div className="row">
				<div className="col-md-6">
					<h3 className="text-center text-info">Experience</h3>
					{expItems.length > 0 || experience === null ? (<ul className="list-group">{expItems}</ul>) : (<p className="text-center">No experience listed</p>)}
				</div>
				<div className="col-md-6">
					<h3 className="text-center text-info">Experience</h3>
					{eduItems.length > 0 || education === null ? (<ul className="list-group">{eduItems}</ul>) : (<p className="text-center">No education listed</p>)}
				</div>
			</div>
		);
	}
}


export default ProfileCreds;