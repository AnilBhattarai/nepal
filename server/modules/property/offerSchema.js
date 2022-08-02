const mongoose = require('mongoose');
const schema = mongoose.Schema;

const offerSchema = new schema({
name:{
    type:String,
    required:true,
},
email:{
  type:String,
  required:true,
},
phone:{
    type:String,
   required:true,

},
message:{ 
  type:String, 
 required:true, 

},
added_at:{type:Date,default:Date.now},
added_by:{ type: schema.Types.ObjectId, ref: 'users' },
is_deleted: { type: Boolean, default: false },
is_active:{type: Boolean, default: true},
propertyId:{ type: schema.Types.ObjectId, ref: 'property' },
});
module.exports = offer = mongoose.model('offer', offerSchema);
