const mongoose = require('mongoose');
const schema = mongoose.Schema;

const myRequestSchema = new schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  phone_no: { type: String },
  purpose: { type: schema.Types.ObjectId, ref: 'enum' },
  mobile_no: { type: String, required: false },
  address: {
    state_id: { type: schema.Types.ObjectId, ref: 'np_state' }, //enum
    district_id: { type: schema.Types.ObjectId, ref: 'np_disctrict', }, //enum
    city_id: { type: schema.Types.ObjectId, ref: 'np_vdcmunicipality', }, //enum
    area_id: { type: schema.Types.ObjectId, ref: 'np_area' }, // enum
  },
  price: { type: String },
  price_label: { type: schema.Types.ObjectId, ref: 'enum' },

  is_approved: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date },
  added_at: { type: Date, default: Date.now },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date },
});
module.exports = myRequest = mongoose.model('myRequest', myRequestSchema);
