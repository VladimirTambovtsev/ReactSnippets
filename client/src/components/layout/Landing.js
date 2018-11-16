import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Slider from '../common/CommonSlider'
import CallToAction from '../common/CallToAction'
import CardBlock from '../common/CardBlock'
import Card from '../common/Card'
import { getProducts } from '../../actions/productsActions'

class Landing extends Component {
	componentDidMount() {
		this.props.getProducts()
		// if (this.props.auth.isAuthenticated) this.props.history.push('/dashboard')	// If user log in => go to '/dashboard'
	}
	render() {
		return (
			<div>
				<Slider />
				<CardBlock title="Popular Products">
					{this.props.product.map(
						({ _id, productName, brand, price, images }) => (
							<Card
								_id={_id}
								key={_id}
								images={images}
								brand={brand}
								productName={productName}
								price={price}
								button={false}
							/>
						)
					)}
				</CardBlock>
				<CallToAction />
				<CardBlock title="New Products">
					{this.props.product.map(
						({ _id, productName, brand, price, images }) => (
							<Card
								_id={_id}
								key={_id}
								images={images}
								brand={brand}
								productName={productName}
								price={price}
								button={false}
							/>
						)
					)}
				</CardBlock>
			</div>
		)
	}
}

Landing.propTypes = {
	getProducts: PropTypes.func.isRequired,
	product: PropTypes.array.isRequired,
}

const mapStateToProps = state => {
	return {
		product: state.product.products,
	}
}

export default connect(
	mapStateToProps,
	{ getProducts }
)(Landing)
