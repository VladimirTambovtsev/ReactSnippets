import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import Slider from '../common/CommonSlider'
import CallToAction from '../common/CallToAction'

class Landing extends Component {
	componentDidMount() {
		// If user log in => go to '/dashboard'
		if (this.props.auth.isAuthenticated) this.props.history.push('/dashboard')
	}
	render() {
		return (
			<div>
				Landing
				<Slider />
				Abc
				<CallToAction />
			</div>
		)
	}
}

Landing.propTypes = {
	auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	auth: state.auth,
})

export default connect(
	mapStateToProps,
	null
)(Landing)
