import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import FormGroup from '@material-ui/core/FormGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import FileUpload from '../../common/FileUpload'
import TextFieldGroup from '../../common/TextFieldGroup'
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup'
import SelectListGroup from '../../common/SelectListGroup'
import Dashboard from '../Dashboard'
import { connect } from 'react-redux'
import { getBrands } from '../../../actions/brandActions'
import { getCategories } from '../../../actions/categoryActions'
import { addProduct } from '../../../actions/productsActions'

class AddProduct extends Component {
	state = {
		productName: '',
		price: '',
		description: '',
		shipping: '',
		brand: '',
		categories: '',
		frets: '',
		sold: '0',
		available: false,
		publish: false,
		images: [],
		errors: {},
	}

	componentDidMount() {
		this.props.getBrands()
		this.props.getCategories()
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors })
		}
	}

	imagesHandler = images => {
		let imgArray = []
		images.map(img => imgArray.push(img.url))

		this.setState({ images: imgArray })
	}

	handleCheckbox = name => event => {
		this.setState({ [name]: event.target.checked })
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}
	onSubmit = e => {
		e.preventDefault()

		const shipping =
			this.state.shipping === 'true'
				? true
				: this.state.shipping === 'false'
					? false
					: this.state.shipping
		const productData = {
			productName: this.state.productName,
			price: this.state.price,
			description: this.state.description,
			shipping: shipping,
			brand: this.state.brand,
			categories: this.state.categories,
			frets: this.state.frets,
			sold: this.state.sold,
			available: this.state.available,
			publish: this.state.publish,
			images: this.state.images,
		}

		this.props.addProduct(productData, this.props.history)
	}

	render() {
		// static
		const shippingOptions = [
			{ label: 'Select shipping', value: 0 },
			{ label: 'Yes', value: true },
			{ label: 'No', value: false },
		]

		const brandOptions = this.props.brand.map(({ _id, brandName }) => {
			return {
				label: brandName,
				value: _id,
			}
		})
		brandOptions.unshift({ label: 'Select brand', value: 0 })

		const categoryOptions = this.props.categories.map(
			({ _id, categoryName }) => {
				return {
					label: categoryName,
					value: _id,
				}
			}
		)
		categoryOptions.unshift({ label: 'Select category', value: 0 })

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
							<label htmlFor="publish">Publish Description</label>
							<TextAreaFieldGroup
								placeholder="Product Description"
								name="description"
								value={this.state.description}
								onChange={this.onChange}
								error={errors.description}
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
							<label htmlFor="categories">Select Category</label>
							<SelectListGroup
								placeholder="category"
								name="categories"
								id="categories"
								value={this.state.categories}
								onChange={this.onChange}
								options={categoryOptions}
								error={errors.categories}
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
						<div className="form-group">
							<FileUpload
								imagesHandler={images => this.imagesHandler(images)}
								reset={errors.images}
							/>
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
		categories: state.category.categories,
		errors: state.errors,
	}
}

export default connect(
	mapStateToProps,
	{
		getCategories,
		getBrands,
		addProduct,
	}
)(withRouter(AddProduct))
