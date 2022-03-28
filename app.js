const express = require('express')
const app = express()
const session = require('express-session')
app.use(session({ secret: '124447yd@@$%%#', cookie: { maxAge: 60000 }, saveUninitialized: false, resave: false }))
app.use(express.static('../1670-ASM/public'));

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.render('home',{userInfo:req.session.User})
})

const adminController = require('./controllers/admin')
app.use('/admin', adminController)

const customerController = require('./controllers/customer')
app.use('/customer', customerController)

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("Server is running! " + PORT)