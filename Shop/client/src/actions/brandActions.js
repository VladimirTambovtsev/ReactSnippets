import axios from 'axios'
import { GET_BRANDS, ADD_BRAND, GET_ERRORS, BRANDS_LOADING } from './types'

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

export const addBrand = (brandData, history) => dispatch => {
	const token = localStorage.getItem('jwtToken')

	// eslint-disable-next-line prettier/prettier
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `${token}`,
	}
	axios
		.post('/api/brands/add', brandData, { headers })
		.then(res => dispatch({ type: ADD_BRAND, payload: res.data }))
		.then(result => history.push('/user/admin/products'))
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// Set loading state
export const setProductLoading = () => {
	return {
		type: BRANDS_LOADING,
	}
}
