const express = require('express');
const async = require('hbs/lib/async');
const router = express.Router();
const {MongoClient,ObjectId} = require('mongodb');

const URL = 'mongodb+srv://binson113:son160901@cluster0.q4jaj.mongodb.net/test';
const DATABASE_URL = 'mongodb+srv://binson113:son160901@cluster0.q4jaj.mongodb.net/test';
const DATABASE_NAME = "ASM-1670"

const Cart = require('../modal/cart');
const Product = require('./book');

async function getDB() {
    const client = await MongoClient.connect(URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

router.get('/cart/add-to-cart/:id', async function (req, res) {
    const productId = req.params.id;
    const id = ObjectId(productId)

    const cart = new Cart(req.session.cart ? req.session.cart : {});
    const dbo = await getDB();
    const books = await dbo.collection('Book').find({"_id": id}).toArray();
    cart.add(books[0], books[0]._id.toString());
    req.session.cart = cart;
    res.redirect('/');
    // })
});

router.get('/cart/reduce/:id', function (req, res, next) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/cart');
});

router.get('/cart/increase/:id', function (req, res, next) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.increseByOne(productId);
    req.session.cart = cart;
    res.redirect('/cart');
});

router.get('/cart/remove/:id', function (req, res, next) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/cart');
});

router.get('/cart', function (req, res, next) {
    console.log("Hiha")
    if(!req.session.cart) {
        return res.render('/cart', {products: null});
    }
    const cart = new Cart(req.session.cart);
    console.log(cart)
    const totalItem = req.session.cart?.totalQty || 0;
    return res.render('./cart', {products: cart.generateArray(), totalPrice: cart.totalPrice, totalItem: totalItem});
});

module.exports = router;
