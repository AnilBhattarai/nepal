const mongoose = require('mongoose');
const schema = mongoose.Schema;
//const { slugify } = require('../../helper/');

const careersSchema = new schema({
  job_title: {
    type: String,
    required: true,
  },
  job_descriptions: {
    type: String,
    required: true,
  },
  skill_requirements: {
    type: String,
    required:true,
  },
  no_of_vacancy: { 
    type: Number,  
    default:1 
  },
  is_deleted:{
    type:Boolean,
    default:false
  },
  added_by:{
    type:String
  },
  is_active:{
      type:Boolean,
      default:true,
    },
 
  
  slug_url: {
    type: String,
    // required:true,
    // unique:true,
  },

  published_on: {
    type: Date,
    default: Date.now,
  },

  updated_at:{
    type:Date
  },
  deadline_at: {
    type: Date,
  
  },
 
  
});

module.exports = Careers = mongoose.model('careersPublisher', careersSchema);
