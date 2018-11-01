import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider from '../common/CommonSlider'
import CallToAction from '../common/CallToAction'
import CardBlock from '../common/CardBlock'
// action creators
import {
	getProductsNew,
	getProductsPopular,
} from '../../actions/productsActions'

class Landing extends Component {
	componentDidMount() {
		this.props.dispatch(getProductsPopular())
		// this.props.dispatch(getProductsNew())
		console.log('props:', this.props)
		// if (this.props.auth.isAuthenticated) this.props.history.push('/dashboard')	// If user log in => go to '/dashboard'
	}
	render() {
		return (
			<div>
				<Slider />
				<CallToAction />
				<h2>Popular Products</h2>
				<CardBlock />
			</div>
		)
	}
}

// const mapStateToProps = state => ({
// 	product: state.product,
// })

function mapStateToProps(state) {
	console.log('state:', state.product.bySell)
	return { bySell: state.product.bySell }
}

export default connect(
	mapStateToProps,
	null
)(Landing)
