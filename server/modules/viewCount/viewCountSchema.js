const mongoose = require('mongoose');
const schema = mongoose.Schema;

const viewCountSchema = new schema({
  property_id: { type: schema.Types.ObjectId, ref: 'property' },
  property_count: { type: Number, default: 1 },
  is_guest: { type: Boolean, default: false },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
});
module.exports = mongoose.model('viewCount', viewCountSchema);
