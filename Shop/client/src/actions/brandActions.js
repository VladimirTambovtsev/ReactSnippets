import axios from 'axios'
import { GET_BRANDS, BRANDS_LOADING } from './types'

export const getBrands = () => dispatch => {
	dispatch(setProductLoading())
	axios
		.get('/api/brands')
		.then(res => {
			dispatch({
				type: GET_BRANDS,
				payload: res.data,
			})
		})
		.catch(err => dispatch({ type: GET_BRANDS, payload: null }))
}

// Set loading state
export const setProductLoading = () => {
	return {
		type: BRANDS_LOADING,
	}
}
