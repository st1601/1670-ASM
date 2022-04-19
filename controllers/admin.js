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
        res.redirect('home')
    }

})

router.post('/addBook', async (req,res)=>{
    const title = req.body.txtTitle
    const author = req.body.txtAuthor

    const objectToInsert = {
        'title': title,
        'author':author
    }
    insertObject(BOOK_TABLE_NAME,objectToInsert)
    res.render('home')

})

router.get('/addBook',(req,res)=>{
    res.render('addBook')
})



module.exports = router;