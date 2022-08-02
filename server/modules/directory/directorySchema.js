const mongoose = require('mongoose');
const schema = mongoose.Schema;

const directorySchema = new schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: [{ type: String }],
  address: { type: String },
  description: { type: String },
  website: { type: String },
  service_category: [{ type: schema.Types.ObjectId, ref: 'enum' }],
  is_active: { type: Boolean, required: true, default: true },
  is_deleted: { type: Boolean, required: true, default: false },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now },
});

module.exports = Directory = mongoose.model('directory', directorySchema);
