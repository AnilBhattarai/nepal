const mongoose = require('mongoose');
const schema = mongoose.Schema;
const agencySchema = new schema({
  title: { type: String, required: true },
  slug_url: { type: String, required: true, unique: true },
  package_id: { type: schema.Types.ObjectId, ref: 'enum' },
  email: { type: String, required: true },
  website: { type: String },
  fb_link: { type: String },
  logo: { type: schema.Types.Mixed },
  background_image: { type: schema.Types.ObjectId, ref: 'file' },
  description: { type: String },
  phone: { type: String },
  mobile: { type: String },
  premium: { type: Boolean, default: false }, ///new added
  address: {
    type: String,
    // state_id: { type: schema.Types.ObjectId, ref: 'np_state' }, //enum
    // district_id: { type: schema.Types.ObjectId, ref: 'np_disctrict' }, //enum
    // city_id: { type: schema.Types.ObjectId, ref: 'np_vdcmunicipality' }, //enum
    // area_id: { type: schema.Types.ObjectId, ref: 'np_area' }, // enum
  },
  is_active: { type: Boolean, default: true, required: true },
  is_deleted: { type: Boolean, default: false, required: true },
  is_approved: { type: Boolean, default: false, required: true },
  approved_at: { type: Date },
  approved_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now, required: true },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  owened_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date },
});

module.exports = agency = mongoose.model('agency', agencySchema);
