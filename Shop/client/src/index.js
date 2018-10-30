import React from 'react'
import ReactDOM from 'react-dom'
import './Resources/css/styles.css'

// Routing
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'

// Redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers'

// Auth
import jwt_decode from 'jwt-decode'
import setAuthToken from './redux/utils/setAuthToken'
import { setCurrentUser } from './redux/actions/user_actions'

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
	console.log('user authenticated')

	// If token expired
	const currentTime = Date.now() / 1000
	if (decoded.exp < currentTime) {
		// Logout user
		// store.dispatch(logoutUser())

		// Clear Profile
		// store.dispatch(clearCurrentProfile())

		// Redirect
		window.location.href = '/login'
	}
}

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)
