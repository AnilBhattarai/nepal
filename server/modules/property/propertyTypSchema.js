const mongoose = require('mongoose');
const schema = mongoose.Schema;

const propertyTypSch = new schema({
  property_type: { type: String, required: false },
  property_title: { type: String, required: false },
  is_deleted: { type: Boolean, default: false },
  is_active: { type: Boolean, default: false },
  is_project: { type: Boolean, default: false, required: false },
  properties: [{ id: { type: schema.Types.ObjectId, ref: 'property' }, start_date: { type: Date }, end_date: { type: Date } }],
});
module.exports = propertyTyp = mongoose.model('propertyType', propertyTypSch);
