var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mongoDB = 'mongodb+srv://binson113:son160901@cluster0.q4jaj.mongodb.net/test';
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
    var db = mongoose.connection;

const FeedbackSchema = new Schema({
    firstname: {type:String, required:true},
    lastname: {type:String},
    mail: {type:String},
    nameBook:{type:String},
    country:{type:String},
    feedback:{type:String}
})

module.exports = mongoose.model('Feedback', FeedbackSchema);