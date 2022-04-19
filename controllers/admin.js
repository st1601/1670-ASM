const express = require('express')
const async = require('hbs/lib/async')
const router = express.Router()
const {insertObject,checkUserRole,USER_TABLE_NAME} = require('../databaseHandler')



router.get('/login',(req,res)=>{
    res.render('login')
})
router.post('/login',async (req,res)=>{
    const name = req.body.txtName
    const pass= req.body.txtPassword
    const role = await checkUserRole(name,pass)
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




module.exports = router;