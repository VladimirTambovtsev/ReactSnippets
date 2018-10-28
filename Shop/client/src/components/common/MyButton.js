import React from 'react'
import { Link } from 'react-router-dom'

const MyButton = (props) => {
	return (
		<div className="my_link">
			<div className="link_default">
				<Link to={props.linkTo}>{props.title}</Link>
			</div>
		</div>
	);
}

export default MyButton;
