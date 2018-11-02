import { GET_PRODUCTS_NEW, GET_PRODUCTS_POPULAR } from '../actions/types'

const initialState = {
	products: [],
	product: {},
	loading: false,
}

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_PRODUCTS_NEW:
			return { ...state, byNew: action.payload }
		case GET_PRODUCTS_POPULAR:
			return {
				...state,
				products: action.payload,
				loading: false,
			}
		default:
			return state
	}
}
