import React, { Component } from 'react'
import Lightbox from 'react-images'

export default class ImageLightbox extends Component {
	state = {
		imgPosition: this.props.position,
		imgArray: [],
	}

	componentDidMount() {
		// @TODO: replace map to forEach
		let imgArray = []
		this.props.images.map(img => {
			imgArray.push({ src: img })
		})
		this.setState({ imgArray })
	}

	goToPrevious = () => {
		this.setState({ imgPosition: this.state.imgPosition - 1 })
	}

	goToNext = () => {
		this.setState({ imgPosition: this.state.imgPosition + 1 })
	}

	closeLightbox = () => {
		this.props.onClose()
	}

	render() {
		return (
			<Lightbox
				currentImage={this.state.imgPosition}
				images={this.state.imgArray}
				isOpen={this.props.open}
				onClickPrev={() => this.goToPrevious()}
				onClickNext={() => this.goToNext()}
				onClose={() => this.closeLightbox()}
			/>
		)
	}
}
