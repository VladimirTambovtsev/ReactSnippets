import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown'
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'
import Dashboard from '../dashboard/Dashboard'

class Cart extends Component {
	render() {
		return (
			<Dashboard>
				<h1>My Cart</h1>
			</Dashboard>
		)
	}
}

export default connect()(Cart)
