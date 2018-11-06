import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Dashboard from '../Dashboard'
import TextFieldGroup from '../../common/TextFieldGroup'
import { getCategories, addCategory } from '../../../actions/categoryActions'

class ManageCategories extends Component {
	state = {
		categoryName: '',
		errors: {},
	}

	componentDidMount() {
		this.props.getCategories()
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

		const categoryData = {
			categoryName: this.state.categoryName,
		}

		this.props.addCategory(categoryData, this.props.history)
	}

	render() {
		const { errors } = this.state
		return (
			<Dashboard>
				<div className="admin_category_wrapper add_product_panel">
					<div className="admin_two_column">
						<div className="left" style={{ paddingRight: '30px' }}>
							<h1
								className="add_product_panel_title"
								style={{ marginTop: '5px' }}
							>
								Categories
							</h1>
							<div className="">
								{this.props.categories.map(({ categoryName, _id }) => (
									<p key={_id}>{categoryName}</p>
								))}
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
								<label htmlFor="categoryName">Category Name</label>
								<TextFieldGroup
									placeholder="Category Name"
									name="categoryName"
									type="text"
									id="categoryName"
									value={this.state.categoryName}
									onChange={this.onChange}
									error={errors.categoryName}
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

const mapStateToProps = state => ({
	categories: state.category.categories,
})

export default connect(
	mapStateToProps,
	{
		getCategories,
		addCategory,
	}
)(withRouter(ManageCategories))
