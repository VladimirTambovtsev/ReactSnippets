import { GET_PRODUCTS_NEW, GET_PRODUCTS_POPULAR } from '../actions/types'

const initialState = {
	products: [],
	loading: false,
}

export default function(state = [], action) {
	switch (action.type) {
		case GET_PRODUCTS_NEW:
			return { ...state, byNew: action.payload }
		case GET_PRODUCTS_POPULAR:
			console.log('action.payload: ', action.payload)
			return { ...state, bySell: action.payload }
		default:
			return state
	}
}
