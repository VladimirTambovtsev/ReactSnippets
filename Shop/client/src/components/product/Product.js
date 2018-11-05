import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProductById } from '../../actions/productsActions'
import TopBar from '../shop/TopBar'

class Product extends Component {
	componentDidMount() {
		// @TODO: get product by name from URL
		const productId = this.props.history.location.pathname.split('/')[2]

		this.props.getProductById(productId)
	}

	render() {
		const { product } = this.props
		console.log('product: ', product)
		return (
			<div>
				<TopBar title="Product" />
				<h1>Product info</h1>
				{product ? product.productName : null}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	product: state.product.product.data,
})

export default connect(
	mapStateToProps,
	{ getProductById }
)(Product)
