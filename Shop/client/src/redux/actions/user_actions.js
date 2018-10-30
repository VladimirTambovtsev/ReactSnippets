import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { GET_ERRORS, SET_CURRENT_USER } from './types'
import setAuthToken from '../utils/setAuthToken'

// @TODO: refactor this shit
export const loginUser = userData => dispatch => {
	axios
		.post('/api/users/login', userData)
		.then(res => {
			const { token } = res.data
			localStorage.setItem('jwtToken', token)
			// Send token to header
			setAuthToken(token)
			// Decode jwt
			const decoded = jwt_decode(token)
			dispatch(setCurrentUser(decoded))
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		)
}

// @descr: Set current user as logged in(action creator's helper func)
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	}
}
