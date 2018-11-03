import React, { Component } from 'react'
import TopBar from './TopBar'
import { connect } from 'react-redux'
import { getProducts } from '../../actions/productsActions'

export class Shop extends Component {
	componentDidMount() {
		this.props.getProducts()
	}

	render() {
		console.log('props: ', this.props)
		return (
			<div>
				<TopBar title="Browse Products" />
				<div className="container">
					<div className="shop_wrapper">
						<div className="left">left</div>
						<div className="right">right</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return { product: state.product.products }
}

export default connect(
	mapStateToProps,
	{ getProducts }
)(Shop)
