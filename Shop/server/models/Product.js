import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ProductSchema = new Schema({
	productName: {
		required: true,
		type: String,
		maxlength: 80
	},
	productImage: {
		type: String
	},
	description: {
		required: true,
		type: String,
		maxlength: 2000
	},
	categories: [{
		categoryTitle: {
			type: Schema.Types.ObjectId,
			ref: 'categories'
		}
	}],
	reviews: [{
		reviewDescription: {
			required: true,
			type: String
		},
		reviewUser: {
			type: Schema.Types.ObjectId,
			ref: 'users'
		},
		reviewDate: {
			required: true,
			type: Date
		}
	}],
	date: {
		type: Date,
		default: Date.now()
	}
})


const Product = mongoose.model('products', ProductSchema)
export default Product
