const mongoose = require('mongoose');
const schema = mongoose.Schema;

const contactDeveloperSchema = new schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  phone: { type: String, required: false },
  developer_id:{type: schema.Types.ObjectId, ref: 'developer'},
  is_active: { type: Boolean,default:false },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date },
    deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
    added_by: { type: schema.Types.ObjectId, ref: 'users' },
    added_at: { type: Date, default: Date.now },
    updated_by: { type: schema.Types.ObjectId, ref: 'users' },
    updated_at: { type: Date },
});
module.exports = contactAgent = mongoose.model('contactDeveloper', contactDeveloperSchema);
