const express = require('express')
const app = express()
const session = require('express-session')
app.use(session({ secret: '124447yd@@$%%#', cookie: { maxAge: 60000 }, saveUninitialized: false, resave: false }))

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    res.render('home',{userInfo:req.session.User})
})

const adminController = require('./controllers/admin')
app.use('/admin', adminController)


const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("Server is running! " + PORT)