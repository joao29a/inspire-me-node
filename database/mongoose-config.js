var mongoose = require('mongoose');

var databaseAddress = 'localhost';
var databasePort    = '27017';
var databaseName    = 'inspireMe';
var databaseUri     = 'mongodb://' + databaseAddress + ':' + databasePort + '/'
                        + databaseName;

global.db = mongoose.createConnection(databaseUri);
