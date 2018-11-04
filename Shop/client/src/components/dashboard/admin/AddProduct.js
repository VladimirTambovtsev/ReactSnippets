import React, { Component } from 'react'
import TextFieldGroup from '../../common/TextFieldGroup'
import Dashboard from '../Dashboard'
import { connect } from 'react-redux'
import { getBrands } from '../../../actions/brandActions'
import { getCategories } from '../../../actions/categoryActions'

class AddProduct extends Component {
	state = {
		productName: '',
		password: '',
		errors: {},
	}
	render() {
		return (
			<Dashboard>
				<h1>Add Product</h1>
				<form noValidate onSubmit={this.onSubmit}>
					<div className="form-group">
						<label htmlFor="exampleInputEmail1">Email address</label>
						<TextFieldGroup
							placeholder="Product Name"
							name="productName"
							type="text"
							id="productName"
							value={this.state.productName}
							onChange={this.onChange}
							error={this.state.errors.productName}
						/>
					</div>
				</form>
			</Dashboard>
		)
	}
}
const mapStateToProps = state => {
	return {
		brand: state.brand.brands,
		category: state.category.categories,
	}
}

export default connect(
	mapStateToProps,
	{
		getCategories,
		getBrands,
	}
)(AddProduct)
