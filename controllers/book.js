var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var mongoDB = 'mongodb+srv://binson113:son160901@cluster0.q4jaj.mongodb.net/test'
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var BookSchema = Schema({
    firstname: {type:String, required:true},
    lastname: {type:String},
    mail: {type:String},
    nameBook:{type:String},
    country:{type:String},
    feedback:{type:String},
    replyFeedbackAdmin:{type:String}
})

module.exports = mongoose.model('Book', BookSchema);