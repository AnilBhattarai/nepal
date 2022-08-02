const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PushNotificationSchema = new Schema({
  id: { type: String },
  to: { type: String },
  sound: { type: String },
  title: { type: String },
  user_id:{type:Schema.Types.ObjectId},
  body: { type: String },
  ttl: { type: Number },
  expiration: { type: Number },
  priority: { type: String, enum: ['default', 'normal', 'high'] },
  badge: { type: Number },
  channelId: { type: String },
  data: { type: Schema.Types.Mixed },
  request: { type: Schema.Types.Mixed },
  response: { type: Schema.Types.Mixed },
  added_at: { type: Date, required: true, default: Date.now },
  added_by: { type: Schema.Types.ObjectId, ref: 'users' },
  status: { type: String },
  status_history: [{ type: Schema.Types.Mixed, required: true }],
});
module.exports = PushNotification = mongoose.model('pushNotification', PushNotificationSchema);