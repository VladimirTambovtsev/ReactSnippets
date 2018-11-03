import axios from 'axios'
import {
	GET_PRODUCTS,
	GET_PRODUCTS_POPULAR,
	GET_PRODUCTS_NEW,
	GET_FILTERED_PRODUCTS,
	PRODUCT_LOADING,
} from './types'

export const getProducts = () => dispatch => {
	dispatch(setProductLoading())
	axios
		.get('/api/products')
		.then(res => {
			dispatch({
				type: GET_PRODUCTS,
				payload: res.data,
			})
		})
		.catch(err => dispatch({ type: GET_PRODUCTS, payload: null }))
}

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

export const getFilteredProducts = (
	skip,
	limit,
	filters = [],
	prevState = []
) => dispatch => {
	const data = { limit, skip, filters }
	dispatch(setProductLoading())
	axios
		.post('/api/products/filtered', data)
		.then(res => {
			let newState = [...prevState, ...res.data.articles]
			dispatch({ type: GET_FILTERED_PRODUCTS, payload: newState })
		})
		.catch(err =>
			dispatch({
				type: GET_FILTERED_PRODUCTS,
				payload: err,
			})
		)
}

// Set loading state
export const setProductLoading = () => {
	return {
		type: PRODUCT_LOADING,
	}
}
