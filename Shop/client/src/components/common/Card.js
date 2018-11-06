import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addToCart } from '../../actions/cartActions'

class Card extends Component {
	handleButton = () => {
		if (this.props.auth.isAuthenticated === true) {
			this.props.addToCart(this.props._id)
			console.log('auth')
		} else {
			this.props.history.push('/signin')
		}
	}
	render() {
		const {
			_id,
			grid,
			images,
			productName,
			price,
			button,
			description,
			auth,
		} = this.props
		console.log('props: ', this.props)
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
						{/* <Link to={`/product/${productName.replace(/\s/g, '-')}`}> */}
						<Link
							to={{
								pathname: `/product/${productName.replace(/\s/g, '-')}`,
								search: '',
								state: { productId: _id },
							}}
						>
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
								<button className="card_link" onClick={this.handleButton}>
									Add To Cart
								</button>
							</div>
						</div>
					) : null}
				</div>
			</div>
		)
	}
}

Card.propTypes = {
	auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	auth: state.auth,
})

export default withRouter(connect(mapStateToProps)(Card))
