import React, { Component } from 'react'
import Lightbox from 'react-images'

export default class ImageLightbox extends Component {
	state = {
		lightboxIsOpen: true,
		imgArray: [],
	}

	componentDidMount() {
		let imgArray = []
		this.props.images.map(img => {
			imgArray.push({ src: img })
		})
		this.setState({ imgArray })
	}

	render() {
		console.log('this.props.images: ', this.props.images)
		return (
			<Lightbox
				currentImage={this.props.position}
				images={this.state.imgArray}
				isOpen={this.state.lightboxIsOpen}
				onClickPrev={() => this.gotoPrevious()}
				onClickNext={() => this.gotoNext()}
				onClose={() => this.props.onClose()}
			/>
		)
	}
}
