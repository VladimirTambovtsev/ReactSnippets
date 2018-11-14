import React from 'react'

const Block = ({ product, removeItem, cart }) => {
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
				{cart
					? cart.map(
							(productInfo, index) =>
								productInfo.id === product._id ? (
									<div key={index}>{productInfo.quantity}</div>
								) : null
					  )
					: null}
			</div>
			<div className="item">
				<h3>Price</h3>$ {product.price}
			</div>
			<div className="item btn">
				<div
					className="cart_remove_btn"
					onClick={() => removeItem(product._id)}
				>
					Remove
				</div>
			</div>
		</div>
	)
}

export default Block
