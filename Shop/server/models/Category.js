import mongoose from 'mongoose'

const Schema = mongoose.Schema

//@desc: Product's Category
const CategorySchema = new Schema({
	categoryName: {
		required: true,
		type: String,
		maxlength: 50
	},
	date: {
		type: Date,
		default: Date.now()
	}
})


const Product = mongoose.model('categories', CategorySchema)
export default Product
