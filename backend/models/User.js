const mongoose = require('mongoose')
const { Schema } = mongoose ;

// this creates like a blueprint for the actual data to be stored in the database
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  } 
})

// This initialized the model
const User = mongoose.model('user', UserSchema);
// this creates indexes for all the different models so no similar data are stored in the database
User.createIndexes();

module.exports = User;