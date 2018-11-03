import React from 'react'

const TopBar = props => {
	return (
		<div className="page_top" style={{ marginTop: '30px' }}>
			<div className="container">{props.title}</div>
		</div>
	)
}

export default TopBar
