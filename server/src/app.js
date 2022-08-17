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
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
var arrayNews = [];
var gettingNews = [];
const getNewData = async () => {
  let sumNews = [];
  let data = await dbConnect();
  data = await data.find().toArray();
  data.map((e) => sumNews.push(e));
  // console.log(sumNews)
  console.log(sumNews.length);
  return sumNews;
};

const main = async () => {
  let data = await dbConnect();
  data = await data.find().toArray();
  console.log(data)
  // try {
    for (i = 0; i < data.length; i++) {
      console.log(i, data.length);
      let text = data[i].category!=""?await translate(JSON.stringify(data[i].category), "hi"):data[i].category;
      let head = data[i].head!=""?await translate(JSON.stringify(data[i].heading), "hi"):data[i].head;
      let News = data[i].News!=""?await translate(JSON.stringify(data[i].news), "hi"):data[i].News;
      let source = data[i].source!=""?await translate(JSON.stringify(data[i].source), "hi"):data[i].source;
      let newsDate = data[i].newsDate!=""?await translate(JSON.stringify(data[i].newsDate), "hi"):data[i].newsDate;
      console.log(text, head, News, source, newsDate);
      let obj1 = {
        category: text.replace(/['"]+/g, ""),
        heading: head.replace(/['"]+/g, ""),
        news: News.replace(/['"]+/g, ""),
        source: source.replace(/['"]+/g, ""),
        imageUrl: data[i].imageUrl,
        newsDate: newsDate.replace(/['"]+/g, ""),
        newsUrl: data[i].newsUrl,
      };
      // let hindiNewsData = new hindiNewsSchema({
      //   heading: obj1.heading,
      //   news: obj1.news,
      //   newsUrl: obj1.newsUrl,
      //   newsDate: obj1.newsDate,
      //   imageUrl: obj1.imageUrl,
      //   source: obj1.source,
      //   category: obj1.category[0],
      // });
      // await hindiNewsData.save();
    }
    // arrayNews.push(obj1);
    i++;
  // } catch {
    // (e) => {
      // console.log(e);
      // console.log("Hello");
    // };
  // }
};
main()
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
const sleep = async(milli) =>{
  return new Promise(resolve=>setTimeout(resolve, milli))
}
// const sendIt = async(req, res)=>{
//   const getData = await getNewData()
//   let datafrom = await dbConnect()
//   console.log(datafrom)
//     for(i=0;i<getData.length;i++){
//     var data = getData[1]
//     console.log(data)
//     const options={
//       method: 'POST',
//       headers:{
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     }
//     request.post('http://127.0.0.1:5000/get', options)
//     await sleep(900000)
//     request('http://127.0.0.1:5000/get',async function (error, response, body) {
//       console.error('error:', error); 
//       console.log('statusCode:', response && response.statusCode);
//     const bodyy = JSON.parse(body)
//       console.log(bodyy)
//       console.log(bodyy.news)
//       console.log(bodyy.heading)
//       await datafrom.updateOne({heading:bodyy.heading},{
//           $set: {
//               news: bodyy.news,
//               simplify: bodyy.simplify
//             }
          
//         })
//         })
//       }
//     }
      // sendIt()
      app.get("/", async(req, res) => {
        // request('http://127.0.0.1:5000/get',async function (error, response, body) {
          // console.error('error:', error); // Print the error
          // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          // console.log(body);
          // const bodyy = JSON.parse(body)
          // console.log(bodyy.news)
        })
    // request('http://127.0.0.1:5000/get',async function (error, response, body) {
    //   console.error('error:', error); // Print the error
    //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //   console.log(body)
    // });
  // })
// });
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
