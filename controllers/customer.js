const express = require('express')
const async = require('hbs/lib/async')
const router = express.Router()
const {insertObject,checkUserRole,getAllObjects,USER_TABLE_NAME} = require('../databaseHandler')
const Feedback = require('./Feedback')
const mongoose = require('mongoose');
const { collection } = require('./Feedback')

router.use(express.urlencoded({extended:true}))





module.exports = router;