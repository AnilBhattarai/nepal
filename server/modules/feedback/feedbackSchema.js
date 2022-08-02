const mongoose = require('mongoose');
const schema = mongoose.Schema;

const feedbackSchema = new schema({
  property_id: { type: schema.Types.ObjectId, ref: 'property' },
  is_listing_correct: { type: Boolean, required: true }, 
  reason : [{type:schema.Types.ObjectId , ref:'enum'}],
  description: { type: String },
  mobile_no : {type:String},
  email: {type:String , required:true},
  is_active: { type: Boolean, required: true, default: true },
  is_deleted: { type: Boolean, required: true, default: false },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
  deleted_at: { type: Date },
  updated_by:{ type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date }
});

module.exports = feedback = mongoose.model('feedback', feedbackSchema);
