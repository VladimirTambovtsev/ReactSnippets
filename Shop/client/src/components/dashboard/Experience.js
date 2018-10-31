import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {
	onDeleteClick(id) {
		this.props.deleteExperience(id);
	}
	render() {
		const experience = this.props.experience.map(({_id, company, title, from, to}) => (
			<tr key={_id}>
				<td>{company}</td>
				<td>{title}</td>
				<td>
					<Moment format="YYYY/MM/DD" >{from}</Moment> - {' '}
					{ to === null ? (' Now') : (<Moment format="YYYY/MM/DD" >{to}</Moment>) }
				</td>
				<td><button onClick={this.onDeleteClick.bind(this, _id)} className="btn btn-danger">Delete</button></td>
			</tr>
		))
		return (
			<div>
				<h4 className="mb-4">Experience Credentials</h4>
				<table className="table">
					<thead>
						<tr>
							<th>Company</th>
							<th>Title</th>
							<th>Years</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{experience}
					</tbody>
				</table>
			</div>
		)
	}
}

Experience.propTypes = {
	deleteExperience: PropTypes.func.isRequired
};



export default connect(null, { deleteExperience })(Experience);