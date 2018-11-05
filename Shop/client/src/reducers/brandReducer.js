import { GET_BRANDS, ADD_BRAND, BRANDS_LOADING } from '../actions/types'

const initialState = {
	brands: [],
	loading: false,
}

export default function(state = initialState, action) {
	switch (action.type) {
		case BRANDS_LOADING:
			return {
				...state,
				loading: true,
			}
		case GET_BRANDS:
			return {
				...state,
				brands: action.payload,
				loading: false,
			}
		case ADD_BRAND:
			return {
				...state,
				newBrand: action.payload.data,
			}
		default:
			return state
	}
}
