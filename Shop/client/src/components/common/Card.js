import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Card extends Component {
	render() {
		const { grid, images, productName, price, button, description } = this.props
		return (
			<div className={`card_item_wrapper ${grid}`}>
				<div
					className="image"
					style={{
						background: `url(${
							images[0] ? images[0] : '/images/image_not_available.png'
						}) no-repeat center center`,
						backgroundSize: 'cover',
						width: grid ? '230px' : images[0] ? '100%' : 'auto',
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

					{grid ? (
						<div className="description">
							<p>{description}</p>
						</div>
					) : null}

					{button === true ? (
						<div className="actions">
							<div className="button_wrap">
								<button className="card_link">Add To Cart</button>
							</div>
						</div>
					) : null}
				</div>
			</div>
		)
	}
}
