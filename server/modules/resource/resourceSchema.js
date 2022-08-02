const mongoose = require('mongoose');
const schema = mongoose.Schema;

const resourceSchema = new schema({
  name: { type: String, required: true },
  key: { type: String, required: true, unique: true },
  file_id: { type: schema.Types.ObjectId, ref: 'file' },
  resource_for: { type: String, enum: ['agent', 'developer'] },
  is_active: { type: Boolean, required: true, default: false },
  is_page: { type: Boolean, required: true, default: false },
  is_deleted: { type: Boolean, required: true, default: false },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now },
});

module.exports = Resource = mongoose.model('resource', resourceSchema);
