import { ADD_TO_CART, CART_LOADING, GET_ALL_FROM_CART } from '../actions/types'

const initialState = {
	cart: [],
	loading: false,
}

export default function(state = initialState, action) {
	switch (action.type) {
		case CART_LOADING:
			return { ...state, loading: true }
		case GET_ALL_FROM_CART:
			return { ...state, loading: false, cart: action.payload }
		case ADD_TO_CART:
			return { ...state, cart: action.payload, loading: false }
		default:
			return state
	}
}
