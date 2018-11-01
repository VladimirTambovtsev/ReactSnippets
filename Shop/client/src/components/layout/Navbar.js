import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { clearCurrentProfile } from '../../actions/profileActions'

class Navbar extends Component {
	onLogoutClick(e) {
		e.preventDefault()
		this.props.clearCurrentProfile()
		this.props.logoutUser()
	}

	render() {
		const { isAuthenticated, user } = this.props.auth
		const authLinks = (
			<div>
				<div className="top">
					<Link to="/"> Profile </Link>
				</div>
				<div className="bottom">
					<Link to="/"> Cart </Link>
				</div>
			</div>
		)
		const guestLinks = (
			<ul className="navbar-nav ml-auto">
				<div className="top">
					<Link to="/signin"> Sign in </Link>
				</div>
				<div className="bottom">
					<Link to="/signup"> Sign up </Link>
				</div>
			</ul>
		)
		return (
			<header className="bck_b_light">
				<div className="container">
					<div className="left">
						<div className="logo">
							<Link to="/"> WAVES </Link>
						</div>
					</div>
					<div className="right">
						{isAuthenticated ? authLinks : guestLinks}
					</div>
				</div>
			</header>
		)
	}
}

Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	auth: state.auth,
})


export default connect(
	mapStateToProps,
	{ logoutUser, clearCurrentProfile }
)(Navbar)
