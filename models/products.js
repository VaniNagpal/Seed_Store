

const mongoose= require('mongoose')

const { Schema } = mongoose;

const productSchema = new Schema({
 name:{
    type: String,
    required:true
 },

 price:{
    type: Number,
    required:true
 },
 description:{
    type: String,
    required:true
 },
 image:{
    type: String,
    required:true
 },
 category:{
   type: String,
    required:true
 },
 seller:{
    type: String,
    required:true
 },
 reviews:[{
    type: String,
    required:false
 }]
    
 }

);
module.exports= mongoose.model('products', productSchema);

