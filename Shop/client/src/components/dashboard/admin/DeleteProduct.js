import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dashboard from '../Dashboard'

class AddProduct extends Component {
	render() {
		return (
			<Dashboard>
				<h1>Delete Products</h1>
			</Dashboard>
		)
	}
}

export default connect()(AddProduct)
