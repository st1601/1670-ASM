const express = require('express')
const async = require('hbs/lib/async')
const router = express.Router()
const {insertObject,checkUserRole,USER_TABLE_NAME} = require('../databaseHandler')

router.get('/register',(req,res)=>{
    res.render('register')
})
router.post('/login',async (req,res)=>{
    const name = req.body.txtName
    const pass= req.body.txtPassword
    const role =await checkUserRole(name,pass)
    if (role=="-1"){
        res.render('login')
        return
    }else{
        console.log("You are a/an: " +role)
        req.session["User"] = {
            'userName': name,
            'role': role 
        }
        res.redirect('/')
    }

})

router.get('/login',(req,res)=>{
    res.render('login')
})



router.post('/registerCustomer',(req,res)=>{
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
    res.render('home')
})

module.exports = router;