import React from 'react'
import { Link } from 'react-router-dom'

const background = {
	img: '/images/featured/featured_home_3.jpg',
	title: 'Up to 40% off',
	text: 'Ea non culpa repellat deserunt odit consectetur',
	linkTitle: 'Shop Now',
	link: '/shop',
}

const CallToAction = () => {
	return (
		<div className="home_promotion">
			<div
				className="home_promotion_img"
				style={{ background: `url(${background.img})` }}
			>
				<div className="featured_action">
					<div className="tag title">{background.title}</div>
					<div className="tag low_title">{background.text}</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							marginTop: '20px',
						}}
					>
						<Link to={background.link}>
							<button>{background.linkTitle}</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CallToAction
