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
googleimg:String,
googleAccessToken:String,
googleId:String
});

module.exports=mongoose.model('user',userSchema
)