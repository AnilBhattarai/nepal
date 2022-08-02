const mongoose = require('mongoose');
const schema = mongoose.Schema;

const contentSchema = new schema({
  title: { type: String, required: true },
  type: { type: String, required: true }, //property_purpose, property_type, property_category, area_unit, property_face, length_unit, road_type, calender_type, furnishing, amenities, currency, price_label, property_ownership, service_category
  value: { type: Number, default: 1 },
  media: { type: schema.Types.Mixed },
  wanted_image: { type: schema.Types.ObjectId, ref: 'file' },
  image: { type: schema.Types.ObjectId, ref: 'file' },
  link: { type: String, },
  description: { type: String },
  order: { type: Number, required: true, default: 0 },
  is_active: { type: Boolean, required: true, default: true },
  is_deleted: { type: Boolean, required: true, default: false },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
  deleted_at: { type: Date },
});

module.exports = Content = mongoose.model('enum', contentSchema);
