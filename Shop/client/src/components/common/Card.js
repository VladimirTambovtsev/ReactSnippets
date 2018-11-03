import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Card extends Component {
	render() {
		const { _id, grid, images, brand, productName, price, button } = this.props
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
						{/* <div className="brand">brand: {brand}</div> */}
						<Link to={`/product/${productName.replace(/\s/g, '-')}`}>
							<div className="name">{productName}</div>
						</Link>
						<div className="price">${price}</div>
					</div>
				</div>

				{grid ? <div className="description">descr</div> : null}

				{button === true ? (
					<div className="actions">
						<div className="button_wrap">
							<button className="card_link">Add To Cart</button>
						</div>
					</div>
				) : null}
			</div>
		)
	}
}
