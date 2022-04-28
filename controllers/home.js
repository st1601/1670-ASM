const express = require('express')
const async = require('hbs/lib/async')
const router = express.Router()
const {insertObject,checkUserRole,getAllObjects,USER_TABLE_NAME} = require('../databaseHandler')
const Feedback = require('./Feedback')
const mongoose = require('mongoose');
const { collection } = require('./Feedback')

router.use(express.urlencoded({extended:true}))

router.get('/index', async (req,res)=>{
    const allBooks = await getAllObjects("Book");
    console.log(allBooks);
    totolItem = req.session.cart?.totalQty || 0;
    res.render('index',{userInfo:req.session.User, books: allBooks, totolItem: totolItem})
})




module.exports = router;