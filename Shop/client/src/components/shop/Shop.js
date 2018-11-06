import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'
import faTh from '@fortawesome/fontawesome-free-solid/faTh'
import TopBar from './TopBar'
import Card from '../common/Card'
import BrandSidebar from './BrandSidebar'
import CategorySidebar from './CategorySidebar'
import PriceSidebar from './PriceSidebar'
import Loadmore from './Loadmore'
import { prices } from './prices'
import { connect } from 'react-redux'
import { getFilteredProducts, getProducts } from '../../actions/productsActions'
import { getBrands } from '../../actions/brandActions'
import { getCategories } from '../../actions/categoryActions'

export class Shop extends Component {
	state = {
		grid: '',
		limit: 6,
		skip: 0,
		filters: [{ brand: [], categories: [], price: [] }],
	}
	componentDidMount() {
		// this.props.getProducts()		- @TODO: remove that route/action/disaptcher
		this.props.getBrands()
		this.props.getCategories()
		this.props.getFilteredProducts(
			this.state.skip,
			this.state.limit,
			this.state.filters
		)
	}

	//@descr: Handle filter; make new array
	handleFilters = (filters, sidebarName) => {
		const newFilters = { ...this.state.filters }
		newFilters[sidebarName] = filters

		if (sidebarName === 'price') {
			let priceValues = this.handlePrice(filters)
			newFilters.price = priceValues
		}

		this.filteredProducts(newFilters)
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

	//@descr: Send query to server
	filteredProducts = filters => {
		this.props.getFilteredProducts(0, this.state.limit, filters) // skip
		this.setState({ skip: 0 })
	}

	// @descr: Load more cards; send query to server
	loadmoreCards = () => {
		let skip = this.state.skip + this.state.limit
		this.props.getFilteredProducts(
			skip,
			this.state.limit,
			this.state.filters,
			this.props.filteredProducts
		)
		this.setState({ skip })
	}

	// @descr: make cards by grids in list
	handleGrid = () => {
		this.setState({ grid: !this.state.grid ? 'grid_bars' : '' })
	}

	render() {
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
									this.handleFilters(filters, 'categories')
								}
							/>
							<PriceSidebar
								prices={prices}
								titleBar="Prices"
								handleFilters={filters => this.handleFilters(filters, 'price')}
							/>
						</div>
						<div className="right">
							<div className="shop_options">
								<div className="shop_grids clear">
									<div
										className={`grid_btn ${this.state.grid ? '' : 'active'}`}
										onClick={() => this.handleGrid()}
									>
										<FontAwesomeIcon icon={faTh} />
									</div>
									<div
										className={`grid_btn ${!this.state.grid ? '' : 'active'}`}
										onClick={() => this.handleGrid()}
									>
										<FontAwesomeIcon icon={faBars} />
									</div>
								</div>
							</div>
							{/* {this.props.product.map(
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
							)} */}
							<Loadmore
								grid={this.state.grid}
								limit={this.state.skip}
								size={this.props.filteredProductsSize}
								products={this.props.filteredProducts}
								loadmore={() => this.loadmoreCards()}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	product: state.product.products,
	filteredProducts: state.product.toShop,
	filteredProductsSize: state.product.toShopSize,
	brand: state.brand.brands,
	category: state.category.categories,
})

export default connect(
	mapStateToProps,
	{
		getProducts,
		getBrands,
		getCategories,
		getFilteredProducts,
	}
)(Shop)
