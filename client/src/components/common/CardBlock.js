import React, { Component } from 'react'

export default class CardBlock extends Component {
	render() {
		return (
			<div className="card_block">
				<div className="container">
					<div className="title">{this.props.title}</div>
					<div style={{ display: 'flex', flexWrap: 'wrap' }}>
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
}
