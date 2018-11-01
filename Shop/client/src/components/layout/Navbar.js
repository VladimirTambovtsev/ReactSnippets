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
					<Link to="/users/cart"> My Cart </Link>
					<Link to="/users/dashboard"> Profile </Link>
					<span onClick={this.onLogoutClick.bind(this)}> Logout </span>
				</div>
				<div className="bottom">
					<Link to="/"> Home </Link>
					<Link to="/shop">Shop </Link>
				</div>
			</div>
		)
		const guestLinks = (
			<ul className="navbar-nav ml-auto">
				<div className="top">
					<Link to="/signup"> Sign up </Link>
				</div>
				<div className="bottom">
					<Link to="/"> Home </Link>
					<Link to="/shop">Shop </Link>
					<Link to="/signin"> Sign in </Link>
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