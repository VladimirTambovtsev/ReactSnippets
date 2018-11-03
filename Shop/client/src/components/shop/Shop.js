import React, { Component } from 'react'
import TopBar from './TopBar'
import Card from '../common/Card'
import BrandSidebar from './BrandSidebar'
import CategorySidebar from './CategorySidebar'
import PriceSidebar from './PriceSidebar'
import { prices } from './prices'
import { connect } from 'react-redux'
import { getProducts } from '../../actions/productsActions'
import { getBrands } from '../../actions/brandActions'
import { getCategories } from '../../actions/categoryActions'

export class Shop extends Component {
	state = {
		grid: false,
		limit: 6, // ?
		skip: 0, // ?
		filters: [
			{
				brand: [],
				categories: [],
				price: [],
			},
		],
	}
	componentDidMount() {
		this.props.getProducts()
		this.props.getBrands()
		this.props.getCategories()
	}

	handleFilters = (filters, sidebarName) => {
		const newFilters = { ...this.state.filters }
		newFilters[sidebarName] = filters

		if (sidebarName === 'price') {
			let priceValues = this.handlePrice(filters)
			newFilters[sidebarName] = priceValues
		}

		this.setState({ filters: newFilters })
	}

	handlePrice = value => {
		const data = prices
		let array = []

		for (let key in data) {
			if (data[key].id === parseInt(value, 10)) {
				array = data[key].values
			}
		}
		return array
	}

	render() {
		console.log('render filters: ', this.state.filters)
		return (
			<div>
				<TopBar title="Browse Products" />
				<div className="container">
					<div className="shop_wrapper">
						<div className="left">
							<BrandSidebar
								brands={this.props.brand}
								titleBar="Brands"
								handleFilters={filters => this.handleFilters(filters, 'brand')}
							/>
							<CategorySidebar
								categories={this.props.category}
								titleBar="Categories"
								handleFilters={filters =>
									this.handleFilters(filters, 'category')
								}
							/>
							<PriceSidebar
								prices={prices}
								titleBar="Prices"
								handleFilters={filters => this.handleFilters(filters, 'price')}
							/>
						</div>
						<div className="right">
							{this.props.product.map(
								({ _id, productName, brand, price, images }) => (
									<Card
										_id={_id}
										key={_id}
										images={images}
										brand={brand}
										productName={productName}
										price={price}
										button={true}
									/>
								)
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		product: state.product.products,
		brand: state.brand.brands,
		category: state.category.categories,
	}
}

export default connect(
	mapStateToProps,
	{ getProducts, getBrands, getCategories }
)(Shop)
