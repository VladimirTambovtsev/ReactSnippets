import React from 'react';

const index = () => {
	return (
		<div className="location_wrapper">
			<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24219.60999177894!2d-73.97643409069018!3d40.64198229187558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b493b5ae649%3A0xfbaa9e9d6f1ddde0!2sKings+Theatre!5e0!3m2!1sru!2sru!4v1540567701319"
				title="Unique title for rendering"
				width="100%"
				height="500px"
				frameBorder="0"
				allowFullScreen
			>
			</iframe>

			<div className="location_tag">
				<div>Location</div>
			</div>
		</div>
	);
}

export default index;
