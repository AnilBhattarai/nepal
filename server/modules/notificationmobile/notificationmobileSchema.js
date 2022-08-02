const mongoose = require('mongoose');
const schema = mongoose.Schema;

const pushTokenSchema = new schema({
  push_token: { type: String },
  user_id: {type:schema.Types.ObjectId , ref:'users' },
  notification_toggle: { type: Boolean, required: true, default: false },
  is_active: { type: Boolean,default:false },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date },
  deleted_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  added_at: { type: Date, default: Date.now },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date },
});

module.exports = PushTokenSch = mongoose.model('pushtoken', pushTokenSchema);
