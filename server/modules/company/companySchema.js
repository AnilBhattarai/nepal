const mongoose = require('mongoose');
const schema = mongoose.Schema;

const companySchema = new schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phone_no: { type: String, required: true },
  is_active: { type: Boolean,default:false },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date },
    deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
    added_by: { type: schema.Types.ObjectId, ref: 'users' },
    added_at: { type: Date, default: Date.now },
    updated_by: { type: schema.Types.ObjectId, ref: 'users' },
    updated_at: { type: Date },
});

module.exports = Company = mongoose.model('company', companySchema);
