import axios from 'axios'
import {
	GET_CATEGORIES,
	ADD_CATEGORY,
	CATEGORIES_LOADING,
	GET_ERRORS,
} from './types'

export const getCategories = () => dispatch => {
	dispatch(setProductLoading())
	axios
		.get('/api/categories')
		.then(res => dispatch({ type: GET_CATEGORIES, payload: res.data }))
		.catch(err => dispatch({ type: GET_CATEGORIES, payload: null }))
}

export const addCategory = (categoryData, history) => dispatch => {
	const token = localStorage.getItem('jwtToken')
	// eslint-disable-next-line prettier/prettier
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `${token}`,
	}
	axios
		.post('/api/categories/add', categoryData, { headers })
		.then(res => dispatch({ type: ADD_CATEGORY, payload: res.data }))
		.then(result => history.push('/user/admin/products'))
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// Set loading state
export const setProductLoading = () => {
	return {
		type: CATEGORIES_LOADING,
	}
}
