import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import profileReducer from './profileReducer'
import postReducer from './postReducer'
import productReducer from './productReducer'
import brandReducer from './brandReducer'
import categoryReducer from './categoryReducer'
import cartReducer from './cartReducer'

export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	profile: profileReducer,
	post: postReducer,
	product: productReducer,
	brand: brandReducer,
	category: categoryReducer,
	cart: cartReducer,
})
