var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var Book = Schema({
    title: {type: String, maxLength: 255},
    author: {type: String, maxLength: 255},

});

module.exports = mongoose.model('Book', Book);