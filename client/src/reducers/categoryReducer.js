import {
	GET_CATEGORIES,
	CATEGORIES_LOADING,
	ADD_CATEGORY,
} from '../actions/types'

const initialState = {
	categories: [],
	loading: false,
}

export default function(state = initialState, action) {
	switch (action.type) {
		case CATEGORIES_LOADING:
			return {
				...state,
				loading: true,
			}
		case GET_CATEGORIES:
			return {
				...state,
				categories: action.payload,
				loading: false,
			}
		case ADD_CATEGORY:
			return {
				...state,
				newCategory: action.payload,
			}
		default:
			return state
	}
}
