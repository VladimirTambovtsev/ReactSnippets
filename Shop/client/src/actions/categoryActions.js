import axios from 'axios'
import { GET_CATEGORIES, CATEGORIES_LOADING } from './types'

export const getCategories = () => dispatch => {
	dispatch(setProductLoading())
	axios
		.get('/api/categories')
		.then(res => {
			console.log('res.data: ', res.data)
			dispatch({
				type: GET_CATEGORIES,
				payload: res.data,
			})
		})
		.catch(err => dispatch({ type: GET_CATEGORIES, payload: null }))
}

// Set loading state
export const setProductLoading = () => {
	return {
		type: CATEGORIES_LOADING,
	}
}
