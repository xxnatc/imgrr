const mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
  url: String,
  caption: String
});

module.exports = exports = mongoose.model('Image', imageSchema);
