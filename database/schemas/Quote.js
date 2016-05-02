var Schema = require('mongoose').Schema;

var quoteSchema = new Schema({
  text: { type: String, required: true },
  author: { type: String, required: true }
});

module.exports = db.model('Quote', quoteSchema);
