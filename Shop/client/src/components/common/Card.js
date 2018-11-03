import React, { Component } from 'react'

export default class Card extends Component {
	render() {
		const { grid, images, brand, productName, price } = this.props
		return (
			<div className={`card_item_wrapper ${grid}`}>
				<div
					className="image"
					style={{
						background: `url(${
							images[0] ? images[0] : '/images/image_not_available.png'
						}) no-repeat center center`,
						backgroundSize: 'cover',
					}}
				/>
				<div className="action_container">
					<div className="tags">
						<div className="brand">brand: {brand}</div>
						<div className="name">{productName}</div>
						<div className="price">${price}</div>
					</div>
				</div>

				{grid ? <div className="description">descr</div> : null}
			</div>
		)
	}
}
