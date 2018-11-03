import React from 'react'
import Card from '../common/Card'

const Loadmore = ({ grid, limit, size, products, loadmore }) => {
	const checkProducts = () => {
		return size < 1 ? (
			<div className="no_result">Sorry, No products found</div>
		) : null
	}
	return (
		<div className="card_block_shop">
			{checkProducts()}
			{products
				? products.map(({ _id, productName, brand, price, images }) => (
						<Card
							_id={_id}
							key={_id}
							images={images}
							brand={brand}
							productName={productName}
							price={price}
							button={true}
						/>
				  ))
				: null}
			{products && size > 0 && size >= limit ? (
				<div className="load_more_container">
					<span onClick={loadmore}>Load more</span>
				</div>
			) : null}
		</div>
	)
}

export default Loadmore
