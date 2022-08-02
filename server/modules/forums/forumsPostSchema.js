const mongoose = require('mongoose');
const schema = mongoose.Schema;
const forumsPostSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },

  added_by: {
    type: schema.Types.ObjectId,
    ref: 'users',
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  added_at: {
    type: Date,
    default: Date.now,
  },
  // is_approved: {
  //   type: Boolean,
  //   default: false,
  // },
  // approved_by: {
  //   type: schema.Types.ObjectId,
  //   ref: 'users',
  // },
  // approved_at: { type: Date },
  // disapproved_at: { type: Date },
  // disapproved_by: {
  //   type: schema.Types.ObjectId,
  //   ref: 'users',
  // },

  added_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
  },
  updated_by: {
    type: schema.Types.ObjectId,
    ref: 'users',
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  deleted_at: {
    type: Date,
  },
  deleted_by: {
    type: schema.Types.ObjectId,
    ref: 'users',
  },
  status: {
    type: String,
    default:'posted',
    enum: ['posted', 'onhold', 'approved', 'disapproved'],
    
  },
  history: [
    {
      action_by: { type: schema.Types.ObjectId, ref: 'users' },
      action_at: { type: Date },
      
      change: { type: String,enum: ['posted', 'onhold', 'approved', 'disapproved'] },
    },
  ],
});

module.exports = Forums = mongoose.model('forum', forumsPostSchema);
