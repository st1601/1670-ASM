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
    const username = req.body.Username
    const role = req.body.Role
    const pass = req.body.Password

    const objectToInsert = {
        username: username,
        role:role,
        password: pass
    }
    //goi ham insert: bang Users, new user trong objectToInsert
    insertObject(USER_TABLE_NAME,objectToInsert)
    res.render('home')
})

app.get('/single-product', (req,res)=>{
    res.render('single-product')
})

app.get('/tracking-order', (req,res)=>{
    res.render('tracking-order')
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