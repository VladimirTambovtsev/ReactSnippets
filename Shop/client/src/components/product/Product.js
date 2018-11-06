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

	addToCartHandler = id => {}

	render() {
		const { product } = this.props
		console.log('props: ', this.props)
		console.log('product: ', product)
		return (
			<div>
				<TopBar title="Product" />
				<div className="container">
					{product ? (
						<div className="product_detail_wrapper">
							<div className="left">
								<div style={{ width: '500px' }}>
									<ProdImages images={product.images} />
								</div>
							</div>
							<div className="right">
								<ProdInfo
									addToCart={id => this.addToCartHandler(id)}
									brand={product.brand}
									description={product.description}
									shipping={product.shipping}
									available={product.available}
									price={product.price}
									frets={product.frets}
									categories={product.categories}
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

// const mapStateToProps = state => ({
// 	product: state.product.product.data,
// })

function mapStateToProps(state) {
	console.log('state: ', state.product.product)
	return {
		product: state.product.product.data,
	}
}

export default connect(
	mapStateToProps,
	{ getProductById }
)(Product)
