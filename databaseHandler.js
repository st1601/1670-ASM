const async = require('hbs/lib/async');
const {MongoClient,ObjectId} = require('mongodb');
const USER_TABLE_NAME = "Users"

const URL = 'mongodb+srv://binson113:son160901@cluster0.q4jaj.mongodb.net/test';
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
async function  checkUserRole(nameI,passI){
    const dbo = await getDB();
    const user= await dbo.collection(USER_TABLE_NAME)({userName:nameI,password:passI});
    if (user==null) {
        return "-1"
    }else{
        console.log(user)
        return user.role;
    }
}

async function  getAllObjects(collectionName){
    const dbo = await getDB();
    return await dbo.collection(collectionName).find().toArray();
}



module.exports = {insertObject,checkUserRole,getAllObjects,USER_TABLE_NAME}