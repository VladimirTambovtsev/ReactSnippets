import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProductById } from '../../actions/productsActions'
import ProdInfo from './ProdInfo'
import ProdImages from './ProdImages'
import TopBar from '../shop/TopBar'

class Product extends Component {
	componentDidMount() {
		// @TODO: add finding product by name on server
		this.props.getProductById(this.props.location.state.productId)
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
					) : null}
				</div>
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
