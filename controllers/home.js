const express = require('express')
const async = require('hbs/lib/async')
const router = express.Router()
const {insertObject,checkUserRole,getAllObjects,USER_TABLE_NAME} = require('../databaseHandler')
const Feedback = require('./Feedback')
const mongoose = require('mongoose');
const { collection } = require('./Feedback')

router.use(express.urlencoded({extended:true}))

router.get('/', async (req,res)=>{
    const allBooks = await getAllObjects("Book");
    // const bestSellers = allBooks.filter(book => {
    //     return book.bestSellers = true;
    // })
    // console.log(allBooks);
    // const bestSellers = allBooks.filter(book => book.bestSellers = true
    // );
    // console.log(bestSellers);
    res.render('index',{userInfo:req.session.User, books: allBooks})
})




module.exports = router;