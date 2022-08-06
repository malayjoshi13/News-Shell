const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
        useUnifiedTopology: true
}).then(()=>{
    console.log("Connection Successful");
}).catch((e)=>{
    console.log(e);
})