import React from 'react'

const Block = ({ product, removeItem, cart }) => {
	console.log('Block props: ', product)
	return (
		<div className="user_product_block">
			<div className="item">
				<div
					className="image"
					style={{
						background: `url(${
							product.images[0]
								? product.images[0]
								: '/images/image_not_available.png'
						}) no-repeat center center`,
					}}
				/>
			</div>
			<div className="item">
				<h4>{product.productName}</h4>
				<div>{product.brand.brandName}</div>
			</div>
			<div className="item">
				<h4>Quantity</h4>
				{/* {cart.map(
					(productInfo, index) =>
						productInfo === product._id ? (
							<div key={index}>{productInfo.quantity}</div>
						) : null
				)} */}
			</div>
		</div>
	)
}

export default Block
