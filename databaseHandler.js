const async = require('hbs/lib/async');
const {MongoClient,ObjectId} = require('mongodb');
const USER_TABLE_NAME = "Users"
const URL = 'mongodb+srv://binson113:son160901@cluster0.q4jaj.mongodb.net/test';
const DATABASE_URL = 'mongodb+srv://binson113:son160901@cluster0.q4jaj.mongodb.net/test';
const DATABASE_NAME = "ASM-1670"
async function getDB() {
    const client = await MongoClient.connect(URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}
async function insertObject(collectionName,objectToInsert){
    const dbo = await getDB();
    const newObject = await dbo.collection(collectionName).insertOne(objectToInsert);
    console.log("Gia tri id moi duoc insert la: ", newObject.insertedId.toHexString());
}
async function insertObjectToCollection(collectionName, newP) {
    const dbo = await getDatabase();
    const result = await dbo.collection(collectionName).insertOne(newP);
    console.log("The newly user inserted id value is: ", result.insertedId.toHexString());
}
async function  checkUserRole(nameI,passI){
    const dbo = await getDB();
    const user= await dbo.collection(USER_TABLE_NAME).findOne({userName:nameI,password:passI});
    if (user==null) {
        return "-1"
    }else{
        console.log(user)
        return user.role;
    }
}
async function getDatabase() {
    const client = await MongoClient.connect(DATABASE_URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}
async function  getAllObjects(collectionName){
    const dbo = await getDB();
    return await dbo.collection(collectionName).find().toArray();
}

async function  getOneObject(collectionName, id){
    const dbo = await getDB();
    return await dbo.collection(collectionName).findOne({_id : ObjectId(id)});
}



async function getCurrentUserSession(req,res){
    const curUser = req.session.User;
    if (!curUser){
        let messageerror = 'please login first!';
        console.log('not login!');
        res.render('login', {message:messageerror});
        return;
    }else {
        console.log('logged in!')
        req.session.User = curUser;
        return curUser;
    }
}
async function getAllDocumentsFromCollection(collectionName) {
    const dbo = await getDatabase();
    const products = await dbo.collection(collectionName).find({}).toArray();
    return products;
}

const BOOK_TABLE_NAME = "Books"
module.exports = {getAllDocumentsFromCollection,insertObject,checkUserRole,getDatabase,getAllObjects,insertObjectToCollection,getCurrentUserSession,USER_TABLE_NAME,BOOK_TABLE_NAME, getOneObject}