import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

class Landing extends Component {
	componentDidMount() {
		// If user log in => go to '/dashboard'
		if (this.props.auth.isAuthenticated) this.props.history.push('/dashboard')
	}
	render() {
		return (
			<div>
				<div className="landing-header">
					<div className="dark-overlay landing-inner text-light">
						<div className="container">
							<div className="row">
								<div className="col-md-12 text-center">
									<h1 className="display-4 mb-4">Developer Connector</h1>
									<p className="lead">
										Create a developer portfolio, share posts and get help from
										other develoeprs.
									</p>
									<hr />
									<Link to="/signup" className="btn btn-lg btn-primary mr-2">
										Sign up
									</Link>
									<Link to="/signin" className="btn btn-lg btn-light">
										Log in
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Landing.propTypes = {
	auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	auth: state.auth,
})

export default connect(
	mapStateToProps,
	null
)(Landing)
