import React, { Component } from 'react'
import { connect } from 'react-redux'

class AddProduct extends Component {
	render() {
		return (
			<div>
				<h1>Delete Products</h1>
			</div>
		)
	}
}

export default connect()(AddProduct)
