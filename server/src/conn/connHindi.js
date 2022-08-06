const {MongoClient} = require('mongodb')
require('dotenv').config()
const client = new MongoClient(process.env.MONGODB_URL)

const dbConnect = async()=>{
    let result = await client.connect();
    db = result.db("test")
    return db.collection("news")
  }
  module.exports = dbConnect;