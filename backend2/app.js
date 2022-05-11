const express = require('express');
const fs = require('fs');
const app = express();
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.get("/sumarize",(req,res)=>{
    data = {}
    fs.readFile('data.json',(err,fd)=>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            res.send(fd);
        }
    })
})

app.listen(8000,()=>{
    console.log("Server is running on port 5000");
})