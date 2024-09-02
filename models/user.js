const mongoose= require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username:{
    type: String,
    required:true
  },
 password:String,
 isAdmin: {
  type: Boolean, 
  default: false, 
},
cart: [{
  id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:"products"
  },
  quantity: Number
}],
orders:[{
  product: {},
  quantity: Number,
  price:Number
}],
googleimg:String,
googleAccessToken:String,
googleId:String
});

module.exports=mongoose.model('User',userSchema
)