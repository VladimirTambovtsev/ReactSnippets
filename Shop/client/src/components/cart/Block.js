import React from 'react'

const Block = ({ product, removeItem }) => {
	console.log('Block props: ', product)
	return <div className="user_product_block">{product.productName}</div>
}

export default Block
