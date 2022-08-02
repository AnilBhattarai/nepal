const mongoose = require('mongoose');
const schema = mongoose.Schema;

const searchFilterSchema = new schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  added_at: { type: Date, default: Date.now },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date },
});
module.exports = searchFilter = mongoose.model('search-filter', searchFilterSchema);
