import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProductById } from '../../actions/productsActions'
import ProdInfo from './ProdInfo'
import ProdImages from './ProdImages'
import TopBar from '../shop/TopBar'

class Product extends Component {
	componentDidMount() {
		// @TODO: add finding product by name on server
		// this.props.getProductById(this.props.location.state.productId)
		this.props.getProductById('5be08339439355fb6e9a03bf')
	}

	// addToCartHandler = id => {}

	render() {
		const { product, loading } = this.props
		if (loading) {
			return <h1>Loading...</h1>
		} else {
			const brand = product.brand
			const category = product.categories
			if (!brand) return <h2>Loading...</h2>
			if (!category) return <h2>Loading...</h2>
			return (
				<div>
					<TopBar title="Product" />
					<div className="container">
						{product && loading === false ? (
							<div className="product_detail_wrapper">
								<div className="left">
									<div style={{ width: '500px' }}>
										<ProdImages images={product.images} />
									</div>
								</div>
								<div className="right">
									<ProdInfo
										addToCart={id => this.addToCartHandler(id)}
										product={product}
										brand={brand}
										category={category}
									/>
								</div>
							</div>
						) : (
							<h1 style={{ textAlign: 'center' }}>Loading...</h1>
						)}
					</div>
				</div>
			)
		}
	}
}

// const mapStateToProps = state => ({
// 	product: state.product.product.data,
// })

function mapStateToProps(state) {
	console.log('state: ', state.product)
	return {
		product: state.product.product,
		loading: state.product.loading,
	}
}

export default connect(
	mapStateToProps,
	{ getProductById }
)(Product)
