import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Slider from '../common/CommonSlider'
import CallToAction from '../common/CallToAction'
import CardBlock from '../common/CardBlock'
// action creators
import {
	getProductsNew,
	getProductsPopular,
	getProducts,
} from '../../actions/productsActions'

class Landing extends Component {
	componentDidMount() {
		// this.props.dispatch(getProductsPopular())
		this.props.getProducts()
		console.log('props:', this.props)
		// this.props.dispatch(getProductsNew())
		// if (this.props.auth.isAuthenticated) this.props.history.push('/dashboard')	// If user log in => go to '/dashboard'
	}
	render() {
		console.log('render props:', this.props)
		console.log('render props prodcut ', this.props.product)

		return (
			<div>
				<Slider />
				<CallToAction />
				<h2>Popular Products</h2>
				{this.props.product.map(
					({ _id, productName, brand, price, images }) => (
						<CardBlock
							key={_id}
							productName={productName}
							brand={brand}
							price={price}
							images={images}
						/>
					)
				)}
			</div>
		)
	}
}

Landing.propTypes = {
	getProducts: PropTypes.func.isRequired,
	product: PropTypes.array.isRequired,
}

// const mapStateToProps = state => ({
// 	product: state.product,
// })

function mapStateToProps(state) {
	console.log('state.product.products: ', state.product.products)
	return {
		product: state.product.products,
	}
}

export default connect(
	mapStateToProps,
	{ getProducts }
)(Landing)
