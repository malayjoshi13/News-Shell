const express = require("express");
const fs = require("fs");
const axios = require("axios").default;
require("./conn/conn");
var bodyParser = require("body-parser");
var request = require("request");
const dbConnect = require("./conn/connHindi");
const newsSchema = require("./model/model");
const hindiNewsSchema = require("./model/hindiModel.js");
const app = express();
const port = process.env.PORT || 8000;
const translate = require("translate");
translate.engine = "google";
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
const getNewData = async () => {
  let sumNews = [];
  let data = await dbConnect();
  data = await data.find().toArray();
  data.map((e) => sumNews.push(e));
  console.log(sumNews.length);
  return sumNews;
};

const main = async (data) => {
  var gettingIt;
  if (data) {
    let text = await translate(data.category, "hi");
    let head = await translate(data.heading, "hi");
    let News = await translate(data.news, "hi");
    let source = await translate(data.source, "hi");
    let newsDate = await translate(data.newsDate, "hi");
    let simplified = await translate(data.simplify, "hi");
    let obj1 = {
      category: text,
      heading: head,
      news: News,
      source: source,
      imageUrl: data.imageUrl,
      newsDate: newsDate,
      newsUrl: data.newsUrl,
      simplified: simplified,
    };
    console.log(obj1);
    gettingIt = obj1;
  }
  return gettingIt;
};

var a = "0";
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
            hheading: "this",
            news: "this",
            simplify: "this",
            hnews: "this",
            hsource: "this",
            simplified: false,
            hsimplified: "this",
            hnewsDate: "this",
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
// const sendIt = async(req, res)=>{
//   const getData = await getNewData()
//   let datafrom = await dbConnect()
//   for(i=0;i<getData.length;i++){
//     if(!getData[i].simplified){
//       let data = getData[i]
//       await axios.post("http://127.0.0.1:5000/get",data)
//       axios.get("http://127.0.0.1:5000/get").then(async(data)=>{
//         console.log("get Function"+data)
//         console.log("Get data"+data.data)
//         // console.log("Get data"+data.data.news)
//         let hindiNews = await main(data.data)
//               // console.log("This is hindinews"+hindiNews)
//               await datafrom.updateOne({heading:data.data.heading},{
//                   $set: {
//                       news: data.data.news,
//                       hheading:hindiNews.heading,
//                       hnews:hindiNews.news,
//                       hsource: hindiNews.source,
//                       simplify: data.data.simplify,
//                       simplified: true,
//                       hsimplified: hindiNews.simplified
//                     }
                    
//                   }
//                   )
//       }).catch((e)=>{console.log(e)})
//       }}
//     }
//       sendIt()
      app.get("/", async(req, res) => {
        const getData = await getNewData();
        res.send(getData)
        
      })
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
