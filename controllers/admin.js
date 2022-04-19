const express = require('express')
const async = require('hbs/lib/async')
const router = express.Router()
const {insertObject,checkUserRole,USER_TABLE_NAME} = require('../databaseHandler')

router.get('/manageBook', async (_req, res) => {

    const collectionName = 'Book'
    const dbo = await getDatabase();
    const products = await getAllDocumentsFromCollection(collectionName);
    // await changeIdToCategoryName(products, dbo);

    res.render('manageBook', { products: products })
})
router.post('/addCategory', async (req, res) => {
    const name = req.body.txtName
    const description = req.body.txtDescription
    const collectionName = 'Category'

    const newP = { name: name, description: description }

    await insertObjectToCollection(collectionName, newP);
    const notify = "Add category successful"

    res.render('addCategory', { notify: notify })
})


// router.get('/addBook', async (req, res) => {

//     const categories = await getAllDocumentsFromCollection('Category');
//     console.log(categories)
//     res.render('addBook', {categories: categories});
// })
// router.post('/addBook', async (req, res) => {
//     const name = req.body.txtName
//     const price = req.body.txtPrice
//     const picture = req.body.txtPicture
//     const category = req.body.txtCategory
//     const hot = req.body.txthot
//     const author = req.body.txtAuthor
//     const description = req.body.txtDescription
//     const collectionName = 'Book'

//     const newP = {
//         name: name, price: Number.parseFloat(price), imgURL: picture, author: author, description: description, category: category, hot: hot
//     }

//     await insertObjectToCollection(collectionName, newP);
//     const notify = "Add book successful"

//     res.render('addBook', { notify: notify })
// })

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




module.exports = router;