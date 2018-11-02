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
} from '../../actions/productsActions'

class Landing extends Component {
	componentDidMount() {
		// this.props.dispatch(getProductsPopular())
		this.props.getProductsPopular()
		console.log('props:', this.props)
		// this.props.dispatch(getProductsNew())
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

Landing.propTypes = {
	getProductsPopular: PropTypes.func.isRequired,
	product: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	product: state.product,
})

export default connect(
	mapStateToProps,
	{ getProductsPopular }
)(Landing)
