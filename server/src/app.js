const express = require("express");
const fs = require("fs");
const axios = require("axios").default;
require("./conn/conn");
var bodyParser = require('body-parser'); 
var request = require('request');
const dbConnect = require("./conn/connHindi");
const newsSchema = require("./model/model");
const hindiNewsSchema = require("./model/hindiModel.js");
const app = express();
const port = process.env.PORT || 8000;
const translate = require("translate");
translate.engine = "google";
const { PythonShell } = require("python-shell");
const path = require("path");
const { Console } = require("console");
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
var arrayNews = [];
var gettingNews = [];
//Function for getting news from database
const getNewData = async () => {
  let sumNews = [];
  let data = await dbConnect();
  data = await data.find().toArray();
  data.map((e) => sumNews.push(e));
  // console.log(sumNews)
  console.log(sumNews.length);
  return sumNews;
};
// Function for converting to Hindi
const main = async () => {
  let data = await dbConnect();
  data = await data.find().toArray();
  // console.log(data)
  try {
    for (i = 0; i < data.length; i++) {
      console.log(i, data.length);
      let text = await translate(JSON.stringify(data[i].category), "hi");
      let head = await translate(JSON.stringify(data[i].heading), "hi");
      let News = await translate(JSON.stringify(data[i].news), "hi");
      let source = await translate(JSON.stringify(data[i].source), "hi");
      let newsDate = await translate(JSON.stringify(data[i].newsDate), "hi");
      let obj1 = {
        category: text.replace(/['"]+/g, ""),
        heading: head.replace(/['"]+/g, ""),
        news: News.replace(/['"]+/g, ""),
        source: source.replace(/['"]+/g, ""),
        imageUrl: data[i].imageUrl,
        newsDate: newsDate.replace(/['"]+/g, ""),
        newsUrl: data[i].newsUrl,
      };
      let hindiNewsData = new hindiNewsSchema({
        heading: obj1.heading,
        news: obj1.news,
        newsUrl: obj1.newsUrl,
        newsDate: obj1.newsDate,
        imageUrl: obj1.imageUrl,
        source: obj1.source,
        category: obj1.category[0],
      });
      await hindiNewsData.save();
      console.log(data.length);
    }
    arrayNews.push(obj1);
    i++;
  } catch {
    (e) => {
      console.log(e);
      console.log("Hello");
    };
  }
};
var a = "0";
//Function for inserting News into Database
const getPosts = async () => {
  const Topics = [
    "top",
    "business",
    "science",
    "entertainment",
    "health",
    "politics",
    "sports",
    "technology",
    "world",
  ];
  Topics.map((e) => {
    axios
      .get(
        `https://newsdata.io/api/1/news?apikey=pub_930227b420d2d7e030700ff57726ca453f8a&country=in&language=en&category=${e}`
      )
      .then(async (res) => {
        const newsArray = res.data.results;
        for (i = 0; i < newsArray.length; i++) {
          const newsData = new newsSchema({
            heading: newsArray[i].title,
            news: newsArray[i].content,
            newsUrl: newsArray[i].link,
            newsDate: newsArray[i].pubDate,
            imageUrl: newsArray[i].image_url,
            source: newsArray[i].source_id,
            category: newsArray[i].category[0],
          });
          try {
            await newsData.save();
          } catch {
            (e) => {
              console.log(e);
            };
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
    });
  };
  var count = "0";
  const getCount = () => {
  count = count + "1";
};
main();
//Function for sending data to Flask
const sendIt = async(req, res)=>{
  const getData = await getNewData()
  // getData.map((e)=>{
    var data = {news:getData[0].news}
    const options={
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    request.post('http://127.0.0.1:5000/get', options)
  // })
}
sendIt()
app.get("/", async(req, res) => {
  //Function for getting data from Flask
      request('http://127.0.0.1:5000/get', function (error, response, body) {
      console.error('error:', error); // Print the error
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the data received
      res.send(body); //Display the response on the website
});      
});
setInterval(() => {
  getPosts();
  getCount();
}, 270000);
app.get("/sumarize", (req, res) => {
  data = {};
  fs.readFile("data.json", (err, fd) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(fd);
    }
  });
});

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

// 155c1629e9894008b694cc584a348551
