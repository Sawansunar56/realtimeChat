const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  text: {
    type: [String],
    required: true
  },
  // User: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'chat'
  // },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Chat', chatSchema);