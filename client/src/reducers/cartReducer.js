import {
	ADD_TO_CART,
	CART_LOADING,
	GET_ALL_FROM_CART,
	GET_ALL_PRODUCTS_FROM_CART,
	REMOVE_FROM_CART,
} from '../actions/types'

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
		case GET_ALL_PRODUCTS_FROM_CART:
			return { ...state, loading: false, fullCart: action.payload }
		case ADD_TO_CART:
			return { ...state, cart: { cart: action.payload, loading: false } }
		case REMOVE_FROM_CART:
			const filteredCart = state.cart.cart.filter(
				({ id }) => id !== action.payload
			)
			const filteredProducts = state.fullCart.filter(
				({ _id }) => _id !== action.payload
			)
			return {
				...state,
				cart: { cart: filteredCart, fullCart: filteredProducts },
			}
		default:
			return state
	}
}
