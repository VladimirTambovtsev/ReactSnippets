import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown'
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'

import { connect } from 'react-redux'
import { getFromCart } from '../../actions/cartActions'
import Dashboard from '../dashboard/Dashboard'

class Cart extends Component {
	state = {
		loading: true,
		total: 0,
		success: false,
		showTotal: false,
	}

	componentDidMount() {
		// this.props.getFromCart()
	}

	render() {
		return (
			<Dashboard>
				<h1>My Cart</h1>
			</Dashboard>
		)
	}
}

const mapStateToProps = state => ({
	cart: state.cart.cart,
	cartLoading: state.cart.loading,
})

export default connect(
	mapStateToProps,
	{ getFromCart }
)(Cart)
