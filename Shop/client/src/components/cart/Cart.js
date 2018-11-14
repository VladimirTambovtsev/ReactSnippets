import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown'
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'

import { connect } from 'react-redux'
import { getFullFromCart, removeFromCart } from '../../actions/cartActions'
import Dashboard from '../dashboard/Dashboard'
import Block from './Block'

class Cart extends Component {
	state = {
		loading: true,
		total: 0,
		success: false,
	}

	componentDidMount() {
		this.props.getFullFromCart()
	}

	removeFromCart = id => {
		this.props.removeFromCart(id)
		this.props.getFullFromCart()
	}

	checkLoading = (cartLoading, finalProducts) => {
		if (cartLoading === true) {
			return <h1>Loading...</h1>
		}

		// @TODO: remove this render when it's loading
		if (finalProducts.length === 0 && cartLoading === false && finalProducts) {
			return (
				<div className="cart_no_items">
					<FontAwesomeIcon icon={faFrown} />
					<div>You have no items</div>
				</div>
			)
		}
	}

	render() {
		const { cartProducts, cartLoading } = this.props

		// @descr: copy `quantity` from state to cartProducts array
		let finalProducts = []
		let totalCount = 0
		if (cartProducts && cartProducts !== undefined && cartLoading === false) {
			cartProducts.forEach(arr1 =>
				this.props.cart.cart.forEach(arr2 => {
					if (arr1._id === arr2.id) {
						arr1.quantity = arr2.quantity
						totalCount += parseInt(arr1.price, 10) * parseInt(arr1.quantity, 10)
						finalProducts.push(arr1)
					}
				})
			)
		}

		return (
			<Dashboard>
				<h1>My Cart</h1>
				<div className="user_cart">
					{this.checkLoading(cartLoading, finalProducts)}

					{finalProducts
						? finalProducts.map(product => (
								<Block
									key={product._id}
									product={product}
									removeItem={id => this.removeFromCart(id)}
								/>
						  ))
						: null}

					{finalProducts && totalCount !== 0 ? (
						<div className="user_cart_sum">
							Total amount: $ {totalCount}
							<div className="paypal_button_container">Paypal</div>
						</div>
					) : null}
				</div>
			</Dashboard>
		)
	}
}

const mapStateToProps = state => {
	console.log('state:', state)
	return {
		cartProducts: state.cart.fullCart,
		cartLoading: state.cart.loading,
		cart: state.cart.cart,
	}
}

export default connect(
	mapStateToProps,
	{ getFullFromCart, removeFromCart }
)(Cart)
