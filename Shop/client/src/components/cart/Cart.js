import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown'
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'

import { connect } from 'react-redux'
import { getFullFromCart } from '../../actions/cartActions'
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

	removeFromCart = id => {}

	render() {
		const { cartProducts, cartLoading } = this.props
		const productsQuantity = this.props.cart.cart

		// @descr: copy `quantity` from state to cartProducts array
		let finalProducts = []
		let totalCount = 0
		if (cartProducts && cartLoading === false) {
			cartProducts.forEach(arr1 =>
				this.props.cart.cart.forEach(arr2 => {
					if (arr1._id === arr2.id) {
						arr1.quantity = arr2.quantity
						totalCount += parseInt(arr1.price) * parseInt(arr1.quantity)
						console.log(totalCount)
						finalProducts.push(arr1)
					}
				})
			)
		}
		console.log('totalCount: ', totalCount)

		return (
			<Dashboard>
				<h1>My Cart</h1>
				<div className="user_cart">
					{finalProducts && cartLoading === false
						? finalProducts.map(product => (
								<Block
									key={product._id}
									product={product}
									removeItem={id => this.removeFromCart(id)}
								/>
						  ))
						: null}

					<div className="user_cart_sum">Total amount: $ {totalCount}</div>
				</div>
			</Dashboard>
		)
	}
}

const mapStateToProps = state => ({
	cartProducts: state.cart.fullCart,
	cartLoading: state.cart.loading,
	cart: state.cart.cart,
})

export default connect(
	mapStateToProps,
	{ getFullFromCart }
)(Cart)
