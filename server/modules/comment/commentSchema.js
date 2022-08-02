const mongoose = require('mongoose');
const schema = mongoose.Schema;
const replySchema = new schema({
  replied_at: { type: Date, default: Date.now },
  replied_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
  is_deleted: { type: Boolean, default: false },
  reply_text: {
    type: String,
  },
  updated_at: { type: Date },
  deleted_at: { type: Date },
});
const commentSchema = new schema({
  title: { type: String, required: true },
  
  post_id: { type: schema.Types.ObjectId,refPath:'comment_for'},
  comment_for: { type: String, enum: ['blog', 'forum', 'property'] },
  replies: [replySchema],
  // is_approved: { type: Boolean, default: false },
  // is_disapproved: { type: Boolean, default: false },
  // approved_by: { type: schema.Types.ObjectId, ref: 'users' },
  // disapproved_by: { type: schema.Types.ObjectId, ref: 'users' },
  status: {
    type: String,
    default: 'posted',
    enum: ['posted', 'onhold', 'approved', 'disapproved'],
    
  },
  history: [
    {
      action_by: { type: schema.Types.ObjectId, ref: 'users' },
      action_at: { type: Date },
      change: { type: String },
    },
  ],
  // approved_at: { type: Date },
  // disapproved_at: { type: Date },
  added_at: { type: Date, default: Date.now() },
  added_by: { type: schema.Types.ObjectId, ref: 'users' },
  updated_at: { type: Date },
  updated_by: { type: schema.Types.ObjectId, ref: 'users' },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date },
});

module.exports = Comments = mongoose.model('comment', commentSchema);
