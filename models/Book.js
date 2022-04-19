const mongoose = require('mongodb');
const Schema = mongoose.Schema;

const Book = Schema({
    title: {type: String, maxLength: 255},
    author: {type: String, maxLength: 255},

});

module.exports = mongoose.model('Book', Book);