import { ADD_TO_CART, CART_LOADING } from '../actions/types'

const initialState = {
	products: [],
	loading: false,
}

export default function(state = initialState, action) {
	switch (action.type) {
		case CART_LOADING:
			return { ...state, loading: true }
		case ADD_TO_CART:
			console.log('action.payload: ', action.payload)
			return { ...state, cartProducts: action.payload, loading: false }
		default:
			return state
	}
}
