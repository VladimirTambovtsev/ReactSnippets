import React from 'react'

const CardBlock = ({ grid, images, brand, productName, price }) => {
	return (
		<div className="cart_block">
			<div className="container">
				<div className="title">Popular</div>
				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					<div className={`card_item_wrapper`}>
						<div
							className="image"
							style={{
								background: `url(${
									images[0] ? images[0] : '/images/image_not_available.png'
								}) no-repeat center center`,
								backgroundSize: 'cover',
							}}
						>
							<div className="action_container">
								<div className="tags">
									<div className="brand">brand: {brand}</div>
									<div className="name">{productName}</div>
									<div className="price">${price}</div>
								</div>
							</div>

							{grid ? <div className="description">descr</div> : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CardBlock
