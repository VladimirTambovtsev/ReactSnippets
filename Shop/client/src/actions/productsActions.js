import axios from 'axios'
import {
	GET_PRODUCTS_POPULAR,
	GET_PRODUCTS_NEW,
	PRODUCT_LOADING,
} from './types'

export const getProductsNew = () => dispatch => {
	axios
		.get('/api/products/hot')
		.then(res =>
			dispatch({
				type: GET_PRODUCTS_NEW,
				payload: res.data,
			})
		)
		.catch(err => dispatch({ type: GET_PRODUCTS_NEW, payload: null }))
}

export const getProductsPopular = () => dispatch => {
	dispatch(setProductLoading())
	axios
		.get('/api/products/popular')
		.then(res => {
			dispatch({ type: GET_PRODUCTS_POPULAR, payload: res.data })
		})
		.catch(err => dispatch({ type: GET_PRODUCTS_POPULAR, payload: null }))
}

// Set loading state
export const setProductLoading = () => {
	return {
		type: PRODUCT_LOADING,
	}
}
