import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './Resources/css/styles.css'

// Redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers'

// Auth
import jwt_decode from 'jwt-decode'
import setAuthToken from './redux/utils/setAuthToken'
import { setCurrentUser } from './redux/actions/user_actions'

// Components
import Login from './components/Auth/Login'

const initialState = {}
const middleware = [thunk]

const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
)

// @descr: Check Auth JWT in storage
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
		// store.dispatch(logoutUser())

		// Clear Profile
		// store.dispatch(clearCurrentProfile())

		// Redirect
		window.location.href = '/singup'
	}
}

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Route exact path="/signin" component={Login} />
		</Router>
	</Provider>,
	document.getElementById('root')
)
