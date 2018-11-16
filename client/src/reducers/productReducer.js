import {
	GET_PRODUCT_BY_ID,
	GET_PRODUCTS_NEW,
	GET_PRODUCTS_POPULAR,
	GET_PRODUCTS,
	GET_FILTERED_PRODUCTS,
	ADD_PRODUCT,
	PRODUCT_LOADING,
} from '../actions/types'

const initialState = {
	products: [],
	product: {},
	loading: false,
}

export default function(state = initialState, action) {
	switch (action.type) {
		case PRODUCT_LOADING:
			return {
				...state,
				loading: true,
			}
		case GET_PRODUCT_BY_ID:
			return {
				...state,
				product: action.payload,
				loading: false,
			}
		case GET_PRODUCTS:
			return {
				...state,
				products: action.payload,
				loading: false,
			}
		case GET_PRODUCTS_NEW:
			return { ...state, byNew: action.payload }
		case GET_PRODUCTS_POPULAR:
			return {
				...state,
				products: action.payload,
				loading: false,
			}
		case GET_FILTERED_PRODUCTS:
			return {
				...state,
				toShop: action.payload,
				toShopSize: action.payload.length,
				loading: false,
			}
		case ADD_PRODUCT:
			return { ...state, newProduct: action.payload }
		default:
			return state
	}
}
