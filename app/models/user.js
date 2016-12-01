// get an instance of mongose and mongoose.schema

var mongoose = require('mongoose')
var Schema = mongoose.Schema

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
  name: { type: String, index: true, unique: true },
  password: String,
  admin: Boolean
}))
