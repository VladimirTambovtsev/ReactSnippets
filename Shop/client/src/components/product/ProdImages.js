import React, { Component } from 'react'
import Lightbox from 'react-images'

export default class ProdImages extends Component {
	state = {
		lightbox: false, // popup img,
		imgPosition: 0,
		lighboxImages: [],
	}

	// componentDidMount() {
	// 	if (this.props.images.length > 1) {
	//         let lighboxImgs = this.props.images
	// 	}
	// }

	render() {
		return (
			<div>
				Images
				{/* <Lightbox images={this.props.images} isOpen={this.state.lightbox} /> */}
			</div>
		)
	}
}
