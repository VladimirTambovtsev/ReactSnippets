import axios from 'axios'
import {
	ADD_TO_CART,
	GET_ALL_FROM_CART,
	CART_LOADING,
	GET_ERRORS,
} from './types'

export const getFromCart = () => dispatch => {
	axios
		.get('/api/users/cart')
		.then(res => {
			dispatch({ type: GET_ALL_FROM_CART, payload: res.data })
		})
		.catch(err => dispatch({ type: GET_ALL_FROM_CART, payload: 'Error' }))
}

export const addToCart = _id => dispatch => {
	const token = localStorage.getItem('jwtToken')
	const headers = {
		'Content-Type': 'application/json',
		// eslint-disable-next-line prettier/prettier
		'Authorization': `${token}`,
	}

	dispatch(setProductLoading())
	axios
		.post(`/api/users/cart/${_id}`, { _id }, { headers })
		.then(res => {
			dispatch({ type: ADD_TO_CART, payload: res.data })
		})
		.catch(err => dispatch({ type: GET_ERRORS, payload: `Error ${err}` }))
}

// Set loading state
export const setProductLoading = () => {
	return {
		type: CART_LOADING,
	}
}
