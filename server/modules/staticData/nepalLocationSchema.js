const mongoose = require('mongoose');
const schema = mongoose.Schema;
const nepalLocation = {};

const stateSchema = new schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  order: { type: Number, required: true, default: 0 },
  is_active: { type: Boolean, required: true, default: true },
  added_by: { type: schema.Types.ObjectId, required: true, ref: 'users' },
  added_at: { type: Date, required: true, default: Date.now },
  is_deleted: { type: Boolean, default: false },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
  deleted_at: { type: Date },
});
const disctrictSchema = new schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  order: { type: Number, required: true, default: 0 },
  state_id: { type: schema.Types.ObjectId, required: true, ref: 'np_state' },
  is_active: { type: Boolean, required: true, default: true },
  is_deleted: { type: Boolean, default: false },
  added_by: { type: schema.Types.ObjectId, required: true, ref: 'users' },
  added_at: { type: Date, required: true, default: Date.now },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
  deleted_at: { type: Date },
});
const vdcMunicipalitySchema = new schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  order: { type: Number, required: true, default: 0 },
  state_id: { type: schema.Types.ObjectId, required: true, ref: 'np_state' },
  district_id: { type: schema.Types.ObjectId, required: true, ref: 'np_disctrict' },
  is_active: { type: Boolean, required: true, default: true },
  is_deleted: { type: Boolean, default: false },
  added_by: { type: schema.Types.ObjectId, required: true, ref: 'users' },
  added_at: { type: Date, required: true, default: Date.now },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
  deleted_at: { type: Date },
});
const areaSchema = new schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  order: { type: Number, required: true, default: 0 },
  state_id: { type: schema.Types.ObjectId, required: true, ref: 'np_state' },
  district_id: { type: schema.Types.ObjectId, required: true, ref: 'np_disctrict' },
  vdcmunicipality_id: { type: schema.Types.ObjectId, required: true, ref: 'np_vdcmunicipality' },
  is_active: { type: Boolean, required: true, default: true },
  is_deleted: { type: Boolean, default: false },
  added_by: { type: schema.Types.ObjectId, required: true, ref: 'users' },
  added_at: { type: Date, required: true, default: Date.now },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
});

nepalLocation.vdcMunicipalitySch = mongoose.model('np_vdcmunicipality', vdcMunicipalitySchema);
nepalLocation.stateSch = mongoose.model('np_state', stateSchema);
nepalLocation.disctrictSch = mongoose.model('np_disctrict', disctrictSchema);
nepalLocation.areaSch = mongoose.model('np_area', areaSchema);
module.exports = nepalLocation;
