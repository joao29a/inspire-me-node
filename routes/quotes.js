var express = require('express');
var Quote   = require('../database/schemas/Quote');
var router  = express.Router();

/* GET method to get a random quote
*  Don't use any parameter
*  Returns a JSON containing the object:
*   {
*     status: int,
*     quote: {
*       text: string,
*       author: string
*     }
*   }
*    - Status:
*        0 - Sucessful
*        1 - Not fetched
*/
router.get('/', function(req, res, next) {
  Quote.count().exec(function(err, count) {
    var random = Math.floor(Math.random() * count);
    Quote.findOne().skip(random).exec(function(err, result) {
      if (err || !result) return res.send({status: 1});
      return res.send({status: 0, quote: result});
    });
  });
});

/* POST method to save quotes
*  It takes two parameters from the body: text and author
*  returns a json containing the object:
*    {
*     status: int,
*   }
*    - Status:
*        0 - Sucessful
*        1 - Not saved
*/
router.post('/save', function(req, res, next) {
  var quote = {
    text: req.body.text,
    author: req.body.author
  }
  Quote.create(quote, function(err, inserted) {
    if (err || !inserted) return res.send({status: 1});
    return res.send({status: 0});
  });
});

module.exports = router;
