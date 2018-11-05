import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Dashboard from '../Dashboard'
import TextFieldGroup from '../../common/TextFieldGroup'
import { getBrands, addBrand } from '../../../actions/brandActions'

class ManageBrands extends Component {
	state = {
		brandName: '',
		errors: {},
	}

	componentDidMount() {
		this.props.getBrands()
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors })
		}
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit = e => {
		e.preventDefault()

		const brandData = {
			brandName: this.state.brandName,
		}

		this.props.addBrand(brandData, this.props.history)
	}

	render() {
		const { errors } = this.state
		console.log('props: ', this.props)
		return (
			<Dashboard>
				<div className="admin_category_wrapper add_product_panel">
					<div className="admin_two_column">
						<div className="left" style={{ paddingRight: '30px' }}>
							<h1
								className="add_product_panel_title"
								style={{ marginTop: '5px' }}
							>
								Brands
							</h1>
							<div className="">
								{this.props.brands
									? this.props.brands.map(({ brandName, _id }) => (
											<p key={_id}>{brandName}</p>
									  ))
									: null}
							</div>
						</div>
						<div className="right">
							<h2
								className="add_product_panel_title"
								style={{ marginTop: '5px' }}
							>
								Add New
							</h2>
							<form noValidate onSubmit={this.onSubmit}>
								<label htmlFor="brandName">Brand Name</label>
								<TextFieldGroup
									placeholder="Brand Name"
									name="brandName"
									type="text"
									id="brandName"
									value={this.state.brandName}
									onChange={this.onChange}
									error={errors.brandName}
								/>
								<button
									type="submit"
									className="btn btn-block btn-primary mt-5"
								>
									Save
								</button>
							</form>
						</div>
					</div>
				</div>
			</Dashboard>
		)
	}
}

const mapStateToProps = state => {
	console.log('state: ', state)
	return {
		brands: state.brand.brands,
	}
}

export default connect(
	mapStateToProps,
	{
		getBrands,
		addBrand,
	}
)(withRouter(ManageBrands))
