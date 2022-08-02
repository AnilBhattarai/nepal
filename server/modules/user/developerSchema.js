const mongoose = require('mongoose');
const schema = mongoose.Schema;

const developerSchema = new schema({
  bio: { type: String },
  name: { type: String, required: true },
  tagline: { type: String }, //
  established_year: { type: String },
  projects_no: { type: Number },
  logo: { type: schema.Types.Mixed },
  banner: { type: schema.Types.Mixed },
  website: { type: String },
  phone: [{ type: String }],
  email: [{ type: String }],
  journey: [{ year: { type: Number }, label: { type: String } }], //
  business: { title: { type: String }, sub_title: { type: String }, video_code: { type: String } }, //
  factoids: [{ top_label: { type: String }, value: { type: String }, button_label: { type: String } }], //
  future_ready: { title: { type: String }, sub_title: { type: String }, video_code: { type: String } }, //
  success_story: { title: { type: String }, sub_title: { type: String }, video_code: { type: String } }, //
  md_name: { type: String },
  md_post: { type: String },
  md_message: { type: String },
  address: { type: schema.Types.Mixed },
  hex_code: { type: String },
  is_verified: { type: Boolean, default: false, required: true },
  verified_at: { type: Date },
  verified_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date },
  added_at: { type: Date, default: Date.now, required: true },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  is_active: { type: Boolean, required: true, default: false },
  is_deleted: { type: Boolean, default: false, required: true },
  deleted_by: { type: schema.Types.ObjectId },
  deleted_at: { type: Date },
});

module.exports = Developer = mongoose.model('developer', developerSchema);
