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
			},
		],
	}
	componentDidMount() {
		this.props.getProducts()
		this.props.getBrands()
		this.props.getCategories()
	}

	render() {
		console.log('props: ', this.props)
		return (
			<div>
				<TopBar title="Browse Products" />
				<div className="container">
					<div className="shop_wrapper">
						<div className="left">
							<BrandSidebar brands={this.props.brand} titleBar="Brands" />
							<CategorySidebar
								categories={this.props.category}
								titleBar="Categories"
							/>
							<PriceSidebar prices={prices} titleBar="Prices" />
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