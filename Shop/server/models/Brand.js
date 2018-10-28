import mongoose from 'mongoose'

const Schema = mongoose.Schema


const BrandSchema = new Schema({
	brandName: {
		required: true,
		type: String,
		unique: 1,
		maxlength: 100
	}
})


const Brand = mongoose.model('brands', BrandSchema)
export default Brand
