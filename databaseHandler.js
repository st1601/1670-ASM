const async = require('hbs/lib/async');
const {MongoClient,ObjectId} = require('mongodb');

const URL = 'mongodb+srv://binson113:son160901@cluster0.q4jaj.mongodb.net/test';
const DATABASE_NAME = "test"
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

const USER_TABLE_NAME = "Users"

module.exports = {insertObject,checkUserRole,USER_TABLE_NAME}