const mongoose = require('mongoose')

const AsciiSchema = new mongoose.Schema({
  ascii: {
    type: String,
    required: true,
  },
  public: {
    type: Boolean,
    required: false,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Ascii', AsciiSchema)
