import React, { Component } from 'react'
import ImageLightbox from './ImageLightbox'

export default class ProdImages extends Component {
	state = {
		lightbox: false, // popup img,
		imgPosition: 0,
		lighboxImages: [],
	}

	handleLightBox = position => {
		if (this.props.images.length > 1) {
			this.setState({ lightbox: true, imgPosition: position })
			console.log('state:', this.state)
		}
	}

	handleLightBoxClose = () => {
		this.setState({ lightbox: false })
	}

	render() {
		console.log('props: ', this.props)
		const { images } = this.props
		console.log('images: ', images)
		return (
			<div className="product_image_container">
				<div className="main_pic">
					<div
						onClick={() => this.handleLightBox(0)}
						style={{
							background: `url(${
								images[0] ? images[0] : '/images/image_not_available.png'
							}) no-repeat center center`,
						}}
					/>
				</div>
				<div className="main_thumbs">
					{images
						? images.map(
								(img, index) =>
									images.length > 1 ? (
										<div
											key={index}
											onClick={() => this.handleLightBox(index)}
											className="thumb"
											style={{ background: `url(${img}) no-repeat` }}
										/>
									) : null
						  )
						: null}
				</div>
				{this.state.lightbox ? (
					<ImageLightbox
						images={images}
						open={this.state.lightbox}
						// ={this.state.imgPosition}
						onClose={() => this.handleLightBoxClose()}
					/>
				) : null}
			</div>
		)
	}
}
