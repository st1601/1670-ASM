const express = require('express')
const app = express()
const async = require('hbs/lib/async')
const Feedback = require('./controllers/Feedback')
const ReplyFeedback = require('./controllers/ReplyFeedback')
const session = require('express-session')
const mongoose = require('mongoose');
const {insertObject,checkUserRole,USER_TABLE_NAME} = require('./databaseHandler')
app.use(session({ secret: '124447yd@@$%%#', cookie: { maxAge: 60000 }, saveUninitialized: false, resave: false }))
app.use(express.static('../1670-ASM/public'));



app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'));

const homeController = require('./controllers/home')
app.use('/', homeController)

app.get('/home',(req,res)=>{
    res.render('home',{userInfo:req.session.User})
})

app.get('/login', (req,res)=>{
    res.render('login')
})

app.get('/category', (req,res)=>{
    res.render('category')
})

app.get('/cart', (req,res)=>{
    res.render('cart')
})

app.get('/checkout', (req,res)=>{
    res.render('checkout')
})

app.get('/confirmation', (req,res)=>{
    res.render('confirmation')
})

app.get('/contact', (req,res)=>{
    res.render('contact')
})

app.get('/feedback', (req,res)=>{
    res.render('feedback')
})

app.get('/register', (req,res)=>{
    res.render('register')
})
app.post('/register',(req,res)=>{
    const name = req.body.Name
    const username = req.body.Username
    const role = req.body.Role
    const password = req.body.Password

    const objectToInsert = {
        name:name,
        userName: username,
        role:role,
        password: password
    }
    insertObject(USER_TABLE_NAME,objectToInsert)
    res.render('/')
})

app.get('/single-product', (req,res)=>{
    res.render('single-product', )
})

app.get('/tracking-order', (req,res)=>{
    res.render('tracking-order')
})





const adminController = require('./controllers/admin')
app.use('/admin', adminController)

const customerController = require('./controllers/customer')
const { render } = require('express/lib/response')
app.use('/customer', customerController)


app.get('/feedback',(req,res)=>{
    res.render('feedback')
})
app.get('/replyFeedback',(req,res)=>{
    res.render('replyFeedback')
})
app.post('/search',async (req,res)=>{
    const searchText = req.body.txtSearch
    const query = await Feedback.find({'nameBook':searchText})
    res.render('viewFeedback',{feedbacks:query})
})
app.get('/viewFeedback', async (req,res)=>{
    const feedbacks = await Feedback.find()
    res.render('viewFeedback',{'feedbacks':feedbacks})
})
app.get('/viewFeedbackAdmin', async (req,res)=>{
    const feedbacks = await Feedback.find()
    const replyFeedbacks = await ReplyFeedback.find()
    res.render('viewFeedbackAdmin',{'feedbacks':feedbacks, 'replyFeedbacks':replyFeedbacks})
})
app.post('/replyFeedback',async (req, res)=>{
    const replyFeedback = req.body.replyFeedback
    const replyFeedbackEntity = new ReplyFeedback({'replyFeedback':replyFeedback})
    await replyFeedbackEntity.save()
    res.redirect('viewFeedbackAdmin')
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