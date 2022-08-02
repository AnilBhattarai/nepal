const mongoose = require('mongoose');
const schema = mongoose.Schema;

const contactAgentSchema = new schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  phone: { type: String, required: false },
  contact_purpose: {
    type: String,
    enum: ['Selling_my_property', 'Buying_new_property', 'Looking_to_rent_a_property'],
  },
  agency_id: { type: schema.Types.ObjectId, ref: 'agency' },
  is_active: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date },
});
module.exports = contactAgent = mongoose.model('contactAgent', contactAgentSchema);
