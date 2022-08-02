const mongoose = require('mongoose');
const schema = mongoose.Schema;


const CounterSchema = new schema({
  _id: {type: String, required: true},
  seq: { type: Number, default: 0 }
});
module.exports = counter = mongoose.model('counter', CounterSchema);
