const mongoose = require('mongoose');
const schema = mongoose.Schema;
const staticController = {};

// const stateSchema = new schema({
//   state_name: { type: String, required: true },
//   is_active: { type: Boolean, required: true, default: true },
//   added_by: { type: schema.Types.ObjectId, required: true, ref: 'users' },
//   added_at: { type: Date, required: true, default: Date.now },
//   is_deleted: { type: Boolean, default: false },
//   deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
//   deleted_at: { type: Date },
//   updated_by: { type: schema.Types.ObjectId, ref: 'users' },
//   updated_at: { type: Date },
// });

// const disctrictSchema = new schema({
//   district_name: { type: String, required: true },
//   state: { type: schema.Types.ObjectId, ref: 'state' },
//   is_active: { type: Boolean, required: true, default: true },
//   added_by: { type: schema.Types.ObjectId, required: true, ref: 'users' },
//   added_at: { type: Date, required: true, default: Date.now },
//   is_deleted: { type: Boolean, default: false },
//   deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
//   deleted_at: { type: Date },
//   updated_by: { type: schema.Types.ObjectId, ref: 'users' },
//   updated_at: { type: Date },
// });

// const vdcMunicipalitySchema = new schema({
//   district: { type: schema.Types.ObjectId, ref: 'district' },
//   municipality_name: { type: String, required: true },
//   is_active: { type: Boolean, required: true, default: true },
//   added_by: { type: schema.Types.ObjectId, required: true, ref: 'users' },
//   added_at: { type: Date, required: true, default: Date.now },
//   is_deleted: { type: Boolean, default: false },
//   deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
//   deleted_at: { type: Date },
//   updated_by: { type: schema.Types.ObjectId, ref: 'users' },
//   updated_at: { type: Date },
// });

// const areaSchema = new schema({
//   municipality: { type: schema.Types.ObjectId, ref: 'municipality' },
//   area_name: { type: String, required: true },
//   is_active: { type: Boolean, required: true, default: true },
//   added_by: { type: schema.Types.ObjectId, required: true, ref: 'users' },
//   added_at: { type: Date, required: true, default: Date.now },
//   is_deleted: { type: Boolean, default: false },
//   deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
//   deleted_at: { type: Date },
//   updated_by: { type: schema.Types.ObjectId, ref: 'users' },
//   updated_at: { type: Date },
// });

const stateSchema = new schema({
  stateID: { type: Number, required: true },
  state_name: { type: String, required: true },
  description: { type: String },
  is_active: { type: Boolean, required: true, default: true },
  added_by: { type: schema.Types.ObjectId, required: true, ref: 'users' },
  added_at: { type: Date, required: true, default: Date.now },
  is_deleted: { type: Boolean, default: false },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
  deleted_at: { type: Date },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date },
});
const disctrictSchema = new schema({
  description: { type: String },
  districtID: { type: Number, required: true },
  district_name: { type: String, required: true },
  stateID: { type: Number, required: true },
  is_active: { type: Boolean, required: true, default: true },
  added_by: { type: schema.Types.ObjectId, required: true, ref: 'users' },
  added_at: { type: Date, required: true, default: Date.now },
  is_deleted: { type: Boolean, default: false },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
  deleted_at: { type: Date },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date },
});
const vdcMunicipalitySchema = new schema({
  description: { type: String },
  municipalityID: { type: Number, required: true },
  districtID: { type: Number, required: true },
  municipality_name: { type: String, required: true },
  is_active: { type: Boolean, required: true, default: true },
  added_by: { type: schema.Types.ObjectId, required: true, ref: 'users' },
  added_at: { type: Date, required: true, default: Date.now },
  is_deleted: { type: Boolean, default: false },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
  deleted_at: { type: Date },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date },
});
const areaSchema = new schema({
  description: { type: String },
  municipalityID: { type: Number, required: true },
  areaID: { type: Number, required: true },
  area_name: { type: String, required: true },
  is_active: { type: Boolean, required: true, default: true },
  added_by: { type: schema.Types.ObjectId, required: true, ref: 'users' },
  added_at: { type: Date, required: true, default: Date.now },
  is_deleted: { type: Boolean, default: false },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
  deleted_at: { type: Date },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date },
});

staticController.vdcMunicipality = mongoose.model('vdcMunicipality', vdcMunicipalitySchema);
staticController.state = mongoose.model('state', stateSchema);
staticController.disctrict = mongoose.model('disctrict', disctrictSchema);
staticController.area = mongoose.model('area', areaSchema);
module.exports = staticController;
