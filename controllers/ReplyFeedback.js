var mongoose = require('mongoose')
    , Schema = mongoose.Schema
var mongoDB = 'mongodb+srv://binson113:son160901@cluster0.q4jaj.mongodb.net/test'
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var ReplyFeedbackSchema = Schema({
    replyFeedback:{type:String, required:true},
})

module.exports = mongoose.model('ReplyFeedback', ReplyFeedbackSchema);