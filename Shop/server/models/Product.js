import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ProductSchema = new Schema({
	productName: {
		required: true,
		type: String,
		maxlength: 80,
		unique: 1
	},
	price: {
		required: true,
		type: Number,
		maxlength: 255
	},
	description: {
		required: true,
		type: String,
		maxlength: 2000
	},
	shipping: {
		required: true,
		type: Boolean
	},
	available: {
		required: true,
		type: Boolean
	},
	brand: {
		type: Schema.Types.ObjectId,
		ref: 'brands',
		required: true
	},
	categories: {
		type: Schema.Types.ObjectId,
		ref: 'categories',
		required: true
	},
	frets: {
		required: true,
		type: Number
	},
	sold: {
		type: Number,
		maxlength: 100,
		default: 0
	},
	publish: {
		required: true,
		type: Boolean
	},
	images: {
		type: Array,
		default: []
	},
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
	}]
}, 
{ timestamps: true })


const Product = mongoose.model('products', ProductSchema)
export default Product
