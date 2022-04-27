const express = require('express')
const async = require('hbs/lib/async')
const router = express.Router()
const {insertObject,checkUserRole,USER_TABLE_NAME, BOOK_TABLE_NAME} = require('../databaseHandler')

const { ObjectId } = require('mongodb')

const { getDatabase, deleteProduct, getAllDocumentsFromCollection,
    getDocumentById, insertObjectToCollection, updateCollection } = require('../databaseHandler')


router.get('/deleteBook', async (req, res) => {
    const id = req.query.id
    const collectionName = 'Book'
    await deleteProduct(collectionName, id)
    res.redirect("manageBook")

})
router.get('/manageBook', async (_req, res) => {

    const collectionName = 'Book'
    const dbo = await getDatabase();
    const products = await getAllDocumentsFromCollection(collectionName);
    await changeIdToCategoryName(products, dbo);

    res.render('managerBook', { products: products })
})


router.post('/addCategory', async (req, res) => {
    const name = req.body.txtName
    const description = req.body.txtDescription
    const collectionName = 'Category'

    const newP = { name: name, description: description }

    await insertObjectToCollection(collectionName, newP);
    const notify = "Add category successful"

    res.render('manageCatrgory', { notify: notify })
})
router.get('/addCategory', (req, res) => {
    res.render('addCategory')
})
router.get('/deleteBook', async (req, res) => {
    const id = req.query.id
    const collectionName = 'Book'
    await deleteProduct(collectionName, id)
    res.redirect("manageBook")

})
router.get('/deleteCategory', async (req, res) => {
    const id = req.query.id
    const collectionName = 'Category'
    await deleteProduct(collectionName, id)

    res.redirect("manageCategory")

})
router.get('/addBook',(req, res) => {

    // const categories = await getAllDocumentsFromCollection('Category');
    // console.log(categories)
    res.render('addBook')
    // {categories: categories}
})
router.post('/addBook', async (req, res) => {
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picture = req.body.txtPicture
    const category = req.body.txtCategory
    const hot = req.body.txthot
    const author = req.body.txtAuthor
    const description = req.body.txtDescription
    // const collectionName = 'Book'

    const objectToInsert = {
        'name': name, 
        'price': price,
        'picture': picture,
        'author': author, 
        'description': description, 
        'category': category, 
        'hot': hot
    }

    // await insertObjectToCollection(collectionName, newP);
    // const notify = "Add book successful"
    insertObject(BOOK_TABLE_NAME,objectToInsert)
    res.render('manageBook')
    // { notify: notify }
})
router.get('/updateBook', async (req, res) => {
    const id = req.query.id
    const collectionName = 'Book'
    
    const books = await getDocumentById(collectionName, id)
    
    const categories = await getAllDocumentsFromCollection('Category');
    console.log(categories)

    res.render('updateBook', {books:books, categories: categories})
})

router.post('/updateBook', async (req, res) => {
    const id = req.body.txtId
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picture = req.body.txtImage
    const category = req.body.txtCategory
    const author = req.body.txtAuthor
    const description = req.body.txtDescription
    const collectionName = 'Book'

    const newvalues = {
        $set: {
            name: name, category: category, price: Number.parseFloat(price),
            description: description, imgURL: picture, author: author, category: category, hot: 'false'
        }

    }
    await updateCollection(id, collectionName, newvalues);

    
    const notify = "Update book successful"

    res.redirect('manageBook')
})
router.get('/manageCategory', async (_req, res) => {
    const collectionName = 'Category'

    const category = await getAllDocumentsFromCollection(collectionName);
    res.render('manageCategory', { category: category })
})
router.get('/addBook', (req, res) => {
    res.render('manageBook')
})
router.post('/addBook', async (req, res) => {
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picture = req.body.txtPicture
    const category = req.body.txtCategory
    const quantity = req.body.txtQuantity
    const author = req.body.txtAuthor
    const published = req.body.txtPublished

    const objectToInsert = {
        'name': name, 
        'price': price, 
        'picture': picture, 
        'author': author, 
        'published': published, 
        'category': category, 
        'quantity': quantity
    }
    insertObject(BOOK_TABLE_NAME, objectToInsert);
    res.render('manageBook')
})
router.get('/manageBook', (req, res) => {
    res.render('manageBook')
})
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
router.get('/home',(req,res)=>{
    res.render('home')
})

router.get('/register', (req, res) => {
    res.render('register')
})
router.post('/register', (req, res) => {
    const name = req.body.Name
    const username = req.body.Username
    const role = req.body.Role
    const password = req.body.Password

    const objectToInsert = {
        name: name,
        userName: username,
        role: role,
        password: password
    }
    insertObject(USER_TABLE_NAME, objectToInsert)
    res.render('login')
})

module.exports = router;