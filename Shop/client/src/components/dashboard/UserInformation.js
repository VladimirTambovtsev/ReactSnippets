import React from 'react'
import { Link } from 'react-router-dom'

const UserInformation = props => {
	return (
		<div>
			<div className="user_nfo_panel">
				<h1>User information</h1>
				<div>
					<span>{props.user.name}</span>
					<span>{props.user.lastname}</span>
					<span>{props.user.email}</span>
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
		</div>
	)
}
export default UserInformation
