import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { clearCurrentProfile } from '../../actions/profileActions'
import { addToCart, getFromCart } from '../../actions/cartActions'

class Navbar extends Component {
	state = {
		totalCart: 0,
	}

	componentDidMount() {
		this.props.getFromCart()
	}

	onLogoutClick(e) {
		e.preventDefault()
		this.props.clearCurrentProfile()
		this.props.logoutUser()
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.cart.cart) {
			this.setState({ totalCart: nextProps.cart.cart.length })
		}
	}

	render() {
		const { isAuthenticated } = this.props.auth
		const authLinks = (
			<div>
				<div className="top">
					<div className="cart_link">
						<Link to="/user/cart">
							{this.state.totalCart ? (
								<span>{this.state.totalCart}</span>
							) : null}
							My Cart
						</Link>
					</div>
					<Link to="/user/dashboard"> Profile </Link>
					<span
						style={{ cursor: 'pointer' }}
						onClick={this.onLogoutClick.bind(this)}
					>
						Logout
					</span>
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

const mapStateToProps = state => {
	return {
		auth: state.auth,
		cart: state.cart.cart,
		cartLoading: state.cart.loading,
	}
}

export default connect(
	mapStateToProps,
	{ logoutUser, clearCurrentProfile, addToCart, getFromCart }
)(Navbar)
