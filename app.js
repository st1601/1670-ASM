const express = require('express')
const app = express()
const async = require('hbs/lib/async')
const Feedback = require('./controllers/Feedback')
const ReplyFeedback = require('./controllers/ReplyFeedback')
const session = require('express-session')
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const {insertObject,checkUserRole,USER_TABLE_NAME,getAllObjects, getOneObject} = require('./databaseHandler')
const cartRoutes = require('./controllers/cart')
app.use(express.static('../1670-ASM/public'));
const MongoStore = require('connect-mongo');

var mongoDB = 'mongodb+srv://binson113:son160901@cluster0.q4jaj.mongodb.net/test'



const adminStoreOwner = require('./controllers/admin')
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

//cac request co chua /admin se di den controller admin
app.use('/admin', adminStoreOwner)





const { ObjectId } = require('mongodb')

const { getDatabase, deleteProduct, getAllDocumentsFromCollection,
    getDocumentById, insertObjectToCollection, updateCollection } = require('./databaseHandler')
const path = require('path');
const hbs = require('hbs');
const { redirect } = require('express/lib/response')
const console = require('console')

const partialsPath = path.join(__dirname, "/views/partials");
hbs.registerPartials(partialsPath);

app.set('view engine', 'hbs')
app.set('views', './views');

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.urlencoded({
//     extended: true
// }))
app.use(cookieParser());
app.use(session({ 
    secret: '124447yd@@$%%#', 
    cookie: { maxAge: 60000 },
    saveUninitialized: false, 
    resave: false,
    store: MongoStore.create({
        mongoUrl: mongoDB
    }),
}))


app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'));

const homeController = require('./controllers/home')
app.use('/', homeController)

app.get('/home', (req, res) => {
    res.render('home', { userInfo: req.session.User })
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/searchNameBook', async (req,res)=>{
    var name = req.body.txtSearchNameBook;
    const Books = await getAllObjects("Book");
    var data = Books.filter(book =>{
         return book.name.includes(name) 
    })
    res.render('category',{userInfo:req.session.User, books: data})
})

app.post('/searchPriceBook', async (req,res)=>{
    var price = req.body.txtSearchPriceBook;
    const Books = await getAllObjects("Book");
    var data = Books.filter(book =>{
         return book.price.toString().includes(price) 
    })
    res.render('category',{userInfo:req.session.User, books: data})
})

app.get('/category', (req, res) => {
    res.render('category')
})


app.get('/checkout', (req, res) => {
    res.render('checkout')
})

app.get('/confirmation', (req, res) => {
    res.render('confirmation')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/feedback', (req, res) => {
    res.render('feedback')
})

app.get('/register', (req, res) => {
    res.render('register')
})
app.post('/register', (req, res) => {
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
    res.render('/')
})

app.get('/single-product', async (req,res)=>{
    var id = req.query.id
    const data = await getOneObject("Book", id);
    console.log(data)
    res.render('single-product', {book:data})
})

app.get('/tracking-order', (req, res) => {
    res.render('tracking-order')
})

const adminController = require('./controllers/admin')
app.use('/admin', adminController)

const customerController = require('./controllers/customer')
const { render } = require('express/lib/response')
app.use('/customer', customerController)


app.get('/feedback', (req, res) => {
    res.render('feedback')
})
app.post('/search', async (req, res) => {
    const searchText = req.body.txtSearch
    const query = await Feedback.find({ 'nameBook': searchText })
    res.render('viewFeedback', { feedbacks: query })
})
app.get('/viewFeedback', async (req, res) => {
    const feedbacks = await Feedback.find()
    res.render('viewFeedback', { 'feedbacks': feedbacks })
})
app.get('/viewFeedbackAdmin', async (req, res) => {
    const feedbacks = await Feedback.find()
    const replyFeedbacks = await ReplyFeedback.find()
    res.render('viewFeedbackAdmin', { 'feedbacks': feedbacks, 'replyFeedbacks': replyFeedbacks })
})
app.get('/replyFeedback',async (req, res) => {
    const id = req.query.id
    const prod = await Feedback.findById(id)
    res.render('replyFeedback', {'feedback': prod})
})
app.post('/replyFeedback', async (req, res) => {
    const id = req.body.id
    const replyFeedbackAdmin = req.body.replyFeedback
    var prod = await Feedback.findById(id)
    prod.replyFeedbackAdmin = replyFeedbackAdmin
    
    prod.save((err)=>{
        res.redirect('/viewFeedbackAdmin')
    })
})

app.post('/feedback', async (req, res) => {
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const mail = req.body.mail
    const nameBook = req.body.nameBook
    const country = req.body.country
    const feedback = req.body.feedback
    const replyFeedbackAdmin = req.body.replyFeedbackAdmin
    const feedbackEntity = new Feedback({ 'firstname': firstname, 'lastname': lastname, 'mail': mail, 'nameBook': nameBook, 'country': country, 'feedback': feedback, 'replyFeedbackAdmin': replyFeedbackAdmin })

    await feedbackEntity.save()

    res.redirect('/')
})

app.get('/deleteBook', async (req, res) => {
    const id = req.query.id
    const collectionName = 'Book'
    await deleteProduct(collectionName, id)
    res.redirect("manageBook")

})
app.get('/manageBook', async (_req, res) => {

    const collectionName = 'Book'
    const dbo = await getDatabase();
    const books = await getAllDocumentsFromCollection(collectionName);
    // await changeIdToCategoryName(books, dbo);

    res.render('manageBook', { books: books })
    // 
})

app.get('/addBook', async (req, res) => {

    // const category = await getAllObjects('Category');
    // console.log(category)
    // res.render('addBook', {category: category});
    res.render('addBook')
})
app.post('/addBook', async (req, res) => {
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picture = req.body.txtPicture
    const category = req.body.txtCategory
    const quantity = req.body.txtQuantity
    const author = req.body.txtAuthor
    const published = req.body.txtPublished
    const collectionName = 'Book'

    const newB = {
        'name': name,
        'price': price,
        'picture': picture,
        'author': author,
        'published': published,
        'category': category,
        'quantity': quantity
    }

    await insertObjectToCollection(collectionName, newB);
    // const notify = "Add book successful"

    res.render('manageBook')
})
// app.post('/addCategory', async (req, res) => {
//     const name = req.body.txtName
//     const description = req.body.txtDescription
//     const collectionName = 'Category'

//     const newP = { name: name, description: description }

//    await insertObjectToCollection(collectionName, newP);
//     const notify = "Add category successful"

//     res.render('manageCategory', )
//     { notify: notify }
//     })

// app.get('/addCategory', (req, res) => {
//     res.render('addCategory')
// })

// app.get('/deleteBook', async (req, res) => {
//     const id = req.query.id
//     const collectionName = 'Book'
//     await deleteProduct(collectionName, id)
//     res.redirect("manageBook")

// })
// app.get('/deleteCategory', async (req, res) => {
//     const id = req.query.id
//     const collectionName = 'Category'
//     await deleteProduct(collectionName, id)

//     res.redirect("manageCategory")

// })

// app.get('/updateBook', async (req, res) => {
//     const id = req.query.id
//     const collectionName = 'Book'

//     const books = await getDocumentById(collectionName, id)

//     const categories = await getAllDocumentsFromCollection('Category');
//     console.log(categories)

//     res.render('updateBook', {books:books, categories: categories})
// })

// app.post('/updateBook', async (req, res) => {
//     const id = req.body.txtId
//     const name = req.body.txtName
//     const price = req.body.txtPrice
//     const picture = req.body.txtImage
//     const category = req.body.txtCategory
//     const author = req.body.txtAuthor
//     const description = req.body.txtDescription
//     const collectionName = 'Book'

//     const newvalues = {
//         $set: {
//             name: name, category: category, price: Number.parseFloat(price),
//             description: description, imgURL: picture, author: author, category: category, hot: 'false'
//         }

//     }
//     await updateCollection(id, collectionName, newvalues);


//     const notify = "Update book successful"

//     res.redirect('manageBook')
// })
// app.get('/manageCategory', async (_req, res) => {
//     const collectionName = 'Category'

//      const category = await getAllDocumentsFromCollection(collectionName);
//     res.render('manageCategory', { category: category })

// })

app.get('/manageBook', async (req, res) => {
    const collectionName = 'Book'
    const dbo = await getDatabase();
    const books = await getAllDocumentsFromCollection(collectionName);
    // await changeIdToCategoryName(books, dbo);

    res.render('manageBook', { books: books })
    // 
})

app.use('/', cartRoutes);


const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("Server is running! " + PORT)