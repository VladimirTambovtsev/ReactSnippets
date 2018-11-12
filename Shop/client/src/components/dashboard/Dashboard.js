import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getFromCart } from '../../actions/cartActions'

class Dashboard extends Component {
	state = {
		totalCart: 0,
	}

	componentDidMount() {
		this.props.getFromCart()
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.cart.cart) {
			this.setState({ totalCart: nextProps.cart.cart.length })
		}
	}

	render() {
		const { user } = this.props.auth

		return (
			<div className="container">
				<div className="user_container">
					<div className="user_left_nav">
						<h2>My Account</h2>
						<div className="links">
							<Link to="/user/account">Account</Link>
							<Link to="/user/dashboard">User Information</Link>
							<Link to="/user/cart">
								<div className="cart_link">
									My Cart
									<span>
										{this.state.totalCart ? ` - ${this.state.totalCart}` : null}
									</span>
								</div>
							</Link>
						</div>

						{this.props.auth && user.role === 1 ? (
							<div>
								<h2> Admin</h2>
								<div className="links">
									<Link to="/user/admin/products">All Products</Link>
									<Link to="/user/admin/products/add">Add Product</Link>
									<Link to="/user/admin/products/delete">Delete Product</Link>
									<Link to="/user/admin/brands">Brands</Link>
									<Link to="/user/admin/categories">Categories</Link>
								</div>
							</div>
						) : null}
					</div>
					<div className="user_right_nav">
						<div className="dashboard_container">
							{this.props.children ? (
								this.props.children
							) : (
								<div className="loader" />
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	auth: state.auth,
	cart: state.cart.cart,
	cartLoading: state.cart.loading,
})

export default connect(
	mapStateToProps,
	{ getFromCart }
)(Dashboard)
