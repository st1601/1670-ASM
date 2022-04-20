var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var mongoDB = 'mongodb+srv://binson113:son160901@cluster0.q4jaj.mongodb.net/test'
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var BookSchema = Schema({
    name: {type:String},
    price: {type:String},
    picture: {type:String},
    category:{type:String},
    hot:{type:String},
    author:{type:String},
   description: {type:String},
    
})

module.exports = mongoose.model('Book', BookSchema);