import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'

const ProdInfo = ({ product, brand, category, addToCart }) => {
	const { _id, description, shipping, available, price, frets } = product

	return (
		<div>
			<h1>Brand: {brand.brandName}</h1>
			<p className="product_description">{description}</p>
			<div className="product_tags">
				{shipping === true ? (
					<div className="tag">
						<FontAwesomeIcon icon={faTruck} />

						<div className="tag_text">
							<div>Free shipping</div>
							<div>And return</div>
						</div>
					</div>
				) : null}
				{available === true ? (
					<div className="tag">
						<FontAwesomeIcon icon={faCheck} />

						<div className="tag_text">
							<div>Available</div>
							<div> in store</div>
						</div>
					</div>
				) : (
					<div className="tag">
						<FontAwesomeIcon icon={faTimes} />

						<div className="tag_text">
							<div>Not available</div>
							<div>Pre order only</div>
						</div>
					</div>
				)}
			</div>
			<div className="product_actions">
				<div className="price">${price}</div>
				<div className="cart">
					<button onClick={() => addToCart(_id)} className="add_to_cart_link">
						Add
					</button>
				</div>
			</div>
			<div className="product_specifications">
				<h2>Spec:</h2>
				<div className="item">
					<strong>Frets: </strong>
					{frets}
				</div>
				<div className="item">
					<strong>Category: </strong>
					{category.categoryName}
				</div>
			</div>
		</div>
	)
}

export default ProdInfo
