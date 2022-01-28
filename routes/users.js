const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/inter');

const UserSchema = mongoose.Schema({
  name : String,
  username : String,
  email : String,
  password : String
});

UserSchema.plugin(plm)

module.exports = mongoose.model('user', UserSchema)