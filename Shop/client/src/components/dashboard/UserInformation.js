import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Dashboard from './Dashboard'

const UserInformation = props => {
	return (
		<Dashboard>
			<div className="user_nfo_panel">
				<h1>User information</h1>
				<div>
					<span>{props.auth.user.name}</span>
					<span>{props.auth.user.lastname}</span>
					<span>{props.auth.user.email}</span>
				</div>
				<Link to="/user/edit">
					<button type="submit" className="btn btn-block btn-primary mt-5">
						Edit account info
					</button>
				</Link>
			</div>
			<div className="user_nfo_panel">
				<h1>History Purchases</h1>
				<div className="user_product_block_wrapper">History</div>
			</div>
		</Dashboard>
	)
}

const mapStateToProps = state => ({
	auth: state.auth,
})

export default connect(mapStateToProps)(UserInformation)
