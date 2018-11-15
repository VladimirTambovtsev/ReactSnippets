import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faExclamationCircle from '@fortawesome/fontawesome-free-solid/faExclamationCircle'

export default () => {
	return (
		<div className="container">
			<div className="not_found_container">
				<FontAwesomeIcon size="2x" icon={faExclamationCircle} />
				<h3>Oooops... This Page Is Not Found</h3>
				<p>Sorry, this page does not exist</p>
			</div>
		</div>
	)
}
