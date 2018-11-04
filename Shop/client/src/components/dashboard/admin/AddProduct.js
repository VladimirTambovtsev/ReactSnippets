import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FormGroup from '@material-ui/core/FormGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import TextFieldGroup from '../../common/TextFieldGroup'
import SelectListGroup from '../../common/SelectListGroup'
import Dashboard from '../Dashboard'
import { connect } from 'react-redux'
import { getBrands } from '../../../actions/brandActions'
import { getCategories } from '../../../actions/categoryActions'

class AddProduct extends Component {
	state = {
		productName: '',
		price: '',
		description: '',
		shipping: '',
		brand: '',
		category: '',
		frets: '',
		sold: '0',
		available: false,
		publish: false,
		errors: {},
	}

	handleCheckbox = name => event => {
		this.setState({ [name]: event.target.checked })
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}
	onSubmit = e => {
		e.preventDefault()
		// const productData = {
		// 	productName: this.state.productName,
		// 	description: this.state.description,
		// }

		// this.props.loginUser(userData)
	}

	render() {
		const shippingOptions = [
			{ label: 'Select shipping', value: 0 },
			{ label: 'Yes', value: true },
			{ label: 'No', value: false },
		]
		const brandOptions = [
			{ label: 'Select brand', value: 0 },
			{ label: '1', value: 1 },
			{ label: '2', value: 2 },
		]
		const categoryOptions = [
			{ label: 'Select category', value: 0 },
			{ label: '1', value: 1 },
			{ label: '2', value: 2 },
		]
		const { errors } = this.state
		return (
			<Dashboard>
				<div className="add_product_panel">
					<h1 className="add_product_panel_title">Add Product</h1>
					<form noValidate onSubmit={this.onSubmit}>
						<div className="form-group">
							<label htmlFor="productName">Product Name</label>
							<TextFieldGroup
								placeholder="Product Name"
								name="productName"
								type="text"
								id="productName"
								value={this.state.productName}
								onChange={this.onChange}
								error={errors.productName}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="price">Product Price</label>
							<TextFieldGroup
								placeholder="Price"
								name="price"
								type="number"
								id="price"
								value={this.state.price}
								onChange={this.onChange}
								error={errors.price}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="shipping">Product Shipping</label>
							<SelectListGroup
								placeholder="shipping"
								name="shipping"
								id="shipping"
								value={this.state.shipping}
								onChange={this.onChange}
								options={shippingOptions}
								error={errors.shipping}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="shipping">Product Available</label>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											color="default"
											checked={this.state.available}
											onChange={this.handleCheckbox('available')}
											value={this.state.available}
										/>
									}
									label="Available in stock"
								/>
							</FormGroup>
							<FormHelperText>Select if product is in stock</FormHelperText>
						</div>

						<div className="form-group">
							<label htmlFor="brand">Select Brand</label>
							<SelectListGroup
								placeholder="brand"
								name="brand"
								id="brand"
								value={this.state.brand}
								onChange={this.onChange}
								options={brandOptions}
								error={errors.brand}
							/>
							<FormHelperText>
								or{' '}
								<Link to="/" className="link_text">
									add a new one
								</Link>
							</FormHelperText>
						</div>

						<div className="form-group">
							<label htmlFor="category">Select Category</label>
							<SelectListGroup
								placeholder="category"
								name="category"
								id="category"
								value={this.state.category}
								onChange={this.onChange}
								options={categoryOptions}
								error={errors.category}
							/>
							<FormHelperText>
								or{' '}
								<Link to="/" className="link_text">
									add a new one
								</Link>
							</FormHelperText>
						</div>

						<div className="form-group">
							<label htmlFor="frets">Guitar Frets</label>
							<TextFieldGroup
								placeholder="How many frets?"
								name="frets"
								type="number"
								id="frets"
								value={this.state.frets}
								onChange={this.onChange}
								error={errors.frets}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="sold">Sold items</label>
							<TextFieldGroup
								placeholder="Already sold"
								name="sold"
								type="number"
								id="sold"
								value={this.state.sold}
								onChange={this.onChange}
								error={errors.sold}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="publish">Publish product</label>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											color="default"
											checked={this.state.publish}
											onChange={this.handleCheckbox('publish')}
											value={this.state.publish}
										/>
									}
									label="Publish to global store"
								/>
							</FormGroup>
						</div>

						<button type="submit" className="btn btn-block btn-primary mt-5">
							Save
						</button>
					</form>
				</div>
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
