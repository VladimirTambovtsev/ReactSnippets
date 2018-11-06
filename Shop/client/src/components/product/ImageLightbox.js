import React, { Component } from 'react'
import Lightbox from 'react-images'

export default class ImageLightbox extends Component {
	state = {
		imgArray: [],
	}

	componentDidMount() {
		let imgArray = []
		this.props.images.map(img => {
			imgArray.push({ src: img })
		})
		this.setState({ imgArray })
	}

	closeLightbox = () => {
		this.props.onClose()
	}

	render() {
		console.log('this.props: ', this.props)
		console.log('state.imgArray: ', this.state.imgArray)
		return (
			<Lightbox
				currentImage={this.props.position}
				images={this.state.imgArray}
				isOpen={this.props.open}
				onClickPrev={() => this.gotoPrevious()}
				onClickNext={() => this.gotoNext()}
				onClose={() => this.closeLightbox()}
			/>
		)
	}
}
