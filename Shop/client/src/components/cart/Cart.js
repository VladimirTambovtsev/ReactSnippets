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
		let finalProducts = []
		if (cartProducts && cartLoading === false) {
			cartProducts.forEach(arr1 =>
				this.props.cart.cart.forEach(arr2 => {
					if (arr1._id == arr2.id) {
						arr1.quantity = arr2.quantity
						finalProducts.push(arr1)
					}
				})
			)
		}
		console.log('finalArray: ', finalProducts)
		return (
			<Dashboard>
				<h1>My Cart</h1>
				<div className="user_cart">
					{cartProducts && cartLoading === false
						? cartProducts.map(product => (
								<Block
									key={product._id}
									product={product}
									removeItem={id => this.removeFromCart(id)}
									cart={productsQuantity}
								/>
						  ))
						: null}

					<div className="user_cart_sum">
						Total amount: $
						{cartProducts && cartLoading === false && productsQuantity
							? productsQuantity.map(({ quantity, id }) =>
									cartProducts
										.map(({ price }) => price)
										.reduce((first, second) => first + second)
							  )
							: null}
					</div>
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
