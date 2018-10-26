import React, { Component } from 'react';
import Zoom from 'react-reveal/Zoom'
import MyButton from '../utils/MyButton'

class index extends Component {

	state = {
		prices: [100, 150, 250],
		positions: ['Balcony', 'Medium', 'VIP'],
		desc: [
			'Sed ut perspiciatis unde omnis iste natus error sit voluptatem et quasi architecto beatae voluptatem vitae dicta sunt explicabo.',
			'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
		],
		linkTo: ['http://google.com', 'http://gmail.com', 'http://yandex.ru'],
		delay: [500, 0, 500]
	}

	showBoxes = () => (
		this.state.prices.map((box, index) => (
			<Zoom delay={this.state.delay[index]} key={index}>
				<div className="pricing_item">
					<div className="pricing_inner_wrapper">
						<div className="pricing_title">
							<span>${this.state.prices[index]}</span>
							<span>{this.state.positions[index]}</span>
						</div>
						<div className="pricing_description">
							<span>{this.state.desc[index]}</span>
						</div>
						<div className="pricing_buttons">
							<MyButton text="Purchase" bck="#ffa800" color="#fff" link={this.state.linkTo[index]} />
						</div>
					</div>
				</div>
			</Zoom>
		))
	)

	render() {
		return (
			<div className="bck_black">
				<div className="center_wrapper pricing_section">
					<h2>Pricing</h2>

					<div className="pricing_wrapper">
						{this.showBoxes()}
					</div>
				</div>
			</div>
		);
	}
}

export default index;
