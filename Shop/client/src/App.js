import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { clearCurrentProfile } from './actions/profileActions'

import PrivateRoute from './components/common/PrivateRoute'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'

import Register from './components/auth/Register'
import Login from './components/auth/Login'

import Dashboard from './components/dashboard/Dashboard'

import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import NotFound from './components/not-found/NotFound'

import './App.css'

// check JWT
if (localStorage.jwtToken) {
	// Set auth token header
	setAuthToken(localStorage.jwtToken)
	// Decode token and get user info
	const decoded = jwt_decode(localStorage.jwtToken)
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded))

	// If token expired
	const currentTime = Date.now() / 1000
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser())

		// Clear Profile
		store.dispatch(clearCurrentProfile())

		// Redirect
		window.location.href = '/signin'
	}
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<Navbar />
						<Route exact path="/" component={Landing} />
						<div className="page_container">
							<Route exact path="/signup" component={Register} />
							<Route exact path="/signin" component={Login} />
							<Route exact path="/profiles" component={Profiles} />
							<Route exact path="/profile/:handle" component={Profile} />
							<Route exact path="/not-found" component={NotFound} />
							<Switch>
								<PrivateRoute
									exact
									path="/user/dashboard"
									component={Dashboard}
								/>
							</Switch>
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		)
	}
}

export default App