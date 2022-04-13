const express = require('express')
const app = express()
const async = require('hbs/lib/async')
const Feedback = require('./controllers/Feedback')
const session = require('express-session')
const mongoose = require('mongoose');
app.use(session({ secret: '124447yd@@$%%#', cookie: { maxAge: 60000 }, saveUninitialized: false, resave: false }))
app.use(express.static('../1670-ASM/public'));


app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.render('index',{userInfo:req.session.User})
})
app.get('/login', (req,res)=>{
    res.render('login')
})

const adminController = require('./controllers/admin')
app.use('/admin', adminController)

const customerController = require('./controllers/customer')
app.use('/customer', customerController)

app.get('/feedback',(req,res)=>{
    res.render('feedback')
})

app.get('/viewFeedback', async (req,res)=>{
    const feedbacks = await Feedback.find()
    res.render('viewFeedback',{'feedbacks':feedbacks})
})

app.post('/feedback', async (req, res)=>{
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const mail = req.body.mail
    const nameBook = req.body.nameBook
    const country = req.body.country
    const feedback = req.body.feedback

    const feedbackEntity = new Feedback({'firstname':firstname, 'lastname':lastname, 'mail':mail, 'nameBook':nameBook, 'country':country, 'feedback':feedback})
    
    await feedbackEntity.save()

    res.redirect('/')
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("Server is running! " + PORT)