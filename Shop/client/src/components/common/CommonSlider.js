import React from 'react'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'

const slides = [
	{
		img: '/images/featured/featured_home.jpg',
		title: 'Fender',
		text: 'Custom shop',
		linkTitle: 'Shop Now',
		link: '/shop',
	},
	{
		img: '/images/featured/featured_home_2.jpg',
		title: 'B-stock',
		text: 'Awesome discounts',
		linkTitle: 'View offers',
		link: '/shop',
	},
]

const sliderSettings = {
	dots: false,
	infinite: true,
	speed: 500,
	slideToShow: 1,
	slidesToScroll: 1,
	arrows: false,
}

const CommonSlider = props => {
	return (
		<div className="featured_container">
			<Slider {...sliderSettings}>
				{slides.map((slide, i) => (
					<div key={i}>
						<div
							className="featured_image"
							style={{
								background: `url(${slide.img})`,
								height: `${window.innerHeight}px`,
							}}
						>
							<div className="featured_action">
								<div className="tag title">{slide.title}</div>
								<div className="tag low_title">{slide.text}</div>
								<Link to={slide.link}>
									<button className="btn btn-block btn-primary mt-5">
										{slide.linkTitle}
									</button>
								</Link>
							</div>
						</div>
					</div>
				))}
			</Slider>
		</div>
	)
}

export default CommonSlider
