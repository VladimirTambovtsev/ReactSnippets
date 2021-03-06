import axios from 'axios'
import {
	GET_PRODUCT_BY_ID,
	GET_PRODUCTS,
	GET_PRODUCTS_POPULAR,
	GET_PRODUCTS_NEW,
	GET_FILTERED_PRODUCTS,
	ADD_PRODUCT,
	GET_ERRORS,
	PRODUCT_LOADING,
} from './types'

export const getProductById = id => dispatch => {
	dispatch(setProductLoading())
	axios
		.get(`/api/products/${id}`)
		.then(res => dispatch({ type: GET_PRODUCT_BY_ID, payload: res.data }))
		.catch(err => dispatch({ type: GET_PRODUCT_BY_ID, payload: null }))
}

export const getProducts = () => dispatch => {
	dispatch(setProductLoading())
	axios
		.get('/api/products')
		.then(res => dispatch({ type: GET_PRODUCTS, payload: res.data }))
		.catch(err => dispatch({ type: GET_PRODUCTS, payload: null }))
}

export const getProductsNew = () => dispatch => {
	axios
		.get('/api/products/hot')
		.then(res => dispatch({ type: GET_PRODUCTS_NEW, payload: res.data }))
		.catch(err => dispatch({ type: GET_PRODUCTS_NEW, payload: null }))
}

export const getProductsPopular = () => dispatch => {
	dispatch(setProductLoading())
	axios
		.get('/api/products/popular')
		.then(res => dispatch({ type: GET_PRODUCTS_POPULAR, payload: res.data }))
		.catch(err => dispatch({ type: GET_PRODUCTS_POPULAR, payload: null }))
}

//@methods: POST
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
		.catch(err => dispatch({ type: GET_FILTERED_PRODUCTS, payload: err }))
}

export const addProduct = (productData, history) => dispatch => {
	const token = localStorage.getItem('jwtToken')
	const headers = {
		'Content-Type': 'application/json',
		// eslint-disable-next-line prettier/prettier
		'Authorization': `${token}`,
	}
	axios
		.post('/api/products/add', productData, { headers })
		.then(res => dispatch({ type: ADD_PRODUCT, payload: res.data }))
		.then(() => history.push('/user/admin/products'))
		.catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// Set loading state
export const setProductLoading = () => {
	return {
		type: PRODUCT_LOADING,
	}
}
