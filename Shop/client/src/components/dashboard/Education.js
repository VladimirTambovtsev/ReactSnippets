import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {
	onDeleteClick(id) {
		this.props.deleteEducation(id);
	}
	render() {
		const Education = this.props.education.map(({_id, school, degree, from, to}) => (
			<tr key={_id}>
				<td>{school}</td>
				<td>{degree}</td>
				<td>
					<Moment format="YYYY/MM/DD" >{from}</Moment> - {' '}
					{ to === null ? (' Now') : (<Moment format="YYYY/MM/DD" >{to}</Moment>) }
				</td>
				<td><button onClick={this.onDeleteClick.bind(this, _id)} className="btn btn-danger">Delete</button></td>
			</tr>
		))
		return (
			<div>
				<h4 className="mb-4">Education Credentials</h4>
				<table className="table">
					<thead>
						<tr>
							<th>School</th>
							<th>Degree</th>
							<th>Years</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{Education}
					</tbody>
				</table>
			</div>
		)
	}
}

Education.propTypes = {
	deleteEducation: PropTypes.func.isRequired
};



export default connect(null, { deleteEducation })(Education);