const mongoose = require('mongoose');
const schema = mongoose.Schema;

const favoritePropertySchema = new schema({
  is_favourite: { type: Boolean, required: true, default: false },
  property_id: { type: schema.Types.ObjectId, ref: 'property' },

  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  is_delete: { type: Boolean, required: true, default: false },
  deleted_by: { type: schema.Types.ObjectId, required: false, ref: 'users' },
  deleted_at: { type: Date, required: false },
  added_at: { type: Date, required: true, default: Date.now },
});
module.exports = mongoose.model('favoriteProperty', favoritePropertySchema);
