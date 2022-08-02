const mongoose = require('mongoose');
const schema = mongoose.Schema;

const leadSchema = new schema({
  name: { type: String, required: true },
  inquiry: { type: String, required: true },
  channel: { type: String, default: 'Facebook', enum: ['Contact_Form', 'Facebook', 'Property_Inquiries', 'Via_Phone'] },
  email: { type: String, required: false }, //Contact_Form,Property_Inquiries
  phone_no: { type: String, required: false }, //via Phone, Contact Form, 'Property_Inquiries'
  profile_link: { type: String }, // Facebook
  property_id: { type: schema.Types.ObjectId, ref: 'property' },
  agency_id: { type: schema.Types.ObjectId, ref: 'agency' },
  agent_id: { type: schema.Types.ObjectId, ref: 'users' },
  status: { type: String, default: 'added', enums: ['added', 'unqualified', 'on_progress', 'converted'] },
  status_change_at: { type: Date },
  agent_assigned_at: { type: Date },
  is_assign_by_admin: { type: Boolean, default: false },
  agent_assigned_by: { type: schema.Types.ObjectId, ref: 'user' },
  date: { type: Date, default: Date.now, required: true },
  added_at: { type: Date, default: Date.now, required: true },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  is_active: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date },
});
module.exports = Lead = mongoose.model('lead', leadSchema);
