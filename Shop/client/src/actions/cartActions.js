import axios from 'axios'
import { ADD_TO_CART, CART_LOADING, GET_ERRORS } from './types'

// export const getFromCart = () => dispatch => {
// 	axios.get('/api/users/cart')
// }

export const addToCart = _id => dispatch => {
	const token = localStorage.getItem('jwtToken')
	const headers = {
		'Content-Type': 'application/json',
		// eslint-disable-next-line prettier/prettier
		'Authorization': `${token}`,
	}

	console.log('token: ', token)
	dispatch(setProductLoading())
	axios
		.post(`/api/users/cart/${_id}`, { _id }, { headers })
		.then(res => {
			console.log('res: ', res.data)
			dispatch({ type: ADD_TO_CART, payload: res.data })
		})
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// Set loading state
export const setProductLoading = () => {
	return {
		type: CART_LOADING,
	}
}
