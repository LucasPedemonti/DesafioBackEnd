import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection='products';

const productSchema = new mongoose.Schema({
  
   name: { type: String, required: true },
   price: { type: Number, required: true },
   category: { type: String, required: true },
   stock: { type: Number, required: true }, 
   productImage: { type: String},
   thumbnail: {type: String, required:true},
   description: { type: String, required: true },
   owner: { type: String, default: 'admin'}

});
productSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productsCollection, productSchema);

export default productsModel;