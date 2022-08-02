const mongoose = require('mongoose');
const schema = mongoose.Schema;
//const { slugify } = require('../../helper/');

const careersSeekerSchema = new schema({
  name:{
      type:String,
      required:true,
  },
  email:{
    type:String,
    required:true,
  },
  phone:{
      type:String,
     //required:true,

  },
  cover_letter:{ 
    type:String, 
   required:true, 

},
  cvFile: {
       type:schema.Types.Mixed,
       required:true,
    },
    is_deleted:
    {
      type:Boolean,
      default:false
    },
    applied_on:{
    type: Date,
    default: Date.now,
    }

});

module.exports = Careers = mongoose.model('careersSeeker', careersSeekerSchema);
