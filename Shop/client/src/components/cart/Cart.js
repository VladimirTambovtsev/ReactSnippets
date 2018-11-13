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
		showTotal: false,
	}

	componentDidMount() {
		this.props.getFullFromCart()
	}

	removeFromCart = id => {}

	render() {
		const { cartProducts } = this.props
		return (
			<Dashboard>
				<h1>My Cart</h1>
				<div className="user_cart">
					{cartProducts
						? cartProducts.map(product => (
								<Block
									key={product._id}
									product={product}
									removeItem={id => this.removeFromCart(id)}
								/>
						  ))
						: null}
				</div>
			</Dashboard>
		)
	}
}

const mapStateToProps = state => ({
	cartProducts: state.cart.fullCart,
	cartLoading: state.cart.loading,
})

export default connect(
	mapStateToProps,
	{ getFullFromCart }
)(Cart)
