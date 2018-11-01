import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions'
import ProfileActions from './ProfileActions'
import Experience from './Experience'
import Education from './Education'

class Dashboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile()
	}

	onDeleteClick(e) {
		this.props.deleteAccount()
	}

	render() {
		const { user } = this.props.auth
		const { profile, loading } = this.props.profile

		let dashboardContent
		if (profile === null || loading) {
			dashboardContent = <div className="loader" />
		} else {
			// if user has profile data
			if (Object.keys(profile).length > 0) {
				dashboardContent = (
					<div>
						<p className="lead text-muted">
							Welcome,{' '}
							<Link to={`/profile/${profile.handle}`}>{user.name}</Link>
						</p>
						<div style={{ marginBottom: '60px' }}>
							<button
								onClick={this.onDeleteClick.bind(this)}
								className="btn btn-danger"
							>
								Delete My Account
							</button>
						</div>
					</div>
				)
			} else {
				dashboardContent = (
					<div>
						<p className="lead text-muted">Welcome, {user.name}</p>
						<p>You have not setup yet, please add some info</p>
						<Link to="/profile/create" className="btn btn-primary">
							Add Profile
						</Link>
					</div>
				)
			}
		}
		return (
			<div className="container">
				<div className="user_container">
					<div className="user_left_nav">
						<h2>My Account</h2>
						<div className="links">
							<Link to="/">link 1</Link>
							<Link to="/">link 2</Link>
						</div>
					</div>
					<div className="user_right_nav">
						<h1 className="display-4">Dashboard</h1>
						{dashboardContent}
					</div>
				</div>
			</div>
		)
	}
}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth,
})

export default connect(
	mapStateToProps,
	{ getCurrentProfile, deleteAccount }
)(Dashboard)
