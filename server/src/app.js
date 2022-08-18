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

const main = async (data) => {
  // let data = await dbConnect();
  // data = await data.find().toArray();
  var gettingIt
  if(data){
  
  
  
    // try {
      // for (i = 0; i < data.length; i++) {
      // await sleep(10000)
      let text = await translate(data.category, "hi");
      let head = await translate(data.heading, "hi");
      let News = await translate(data.news, "hi");
      let source = await translate(data.source, "hi");
      let newsDate = await translate(data.newsDate, "hi");
      let simplified = await translate(data.simplify, "hi");
      // console.log(text, head, News, source, newsDate);
      // console.log(text, head, News, source, newsDate)
      let obj1 = {
        category: text,
        heading: head,
        news: News,
        source: source,
        imageUrl: data.imageUrl,
        newsDate: newsDate,
        newsUrl: data.newsUrl,
        simplified: simplified
      };
      console.log(obj1)
      gettingIt = obj1;
    }
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
      // arrayNews.push(obj1);
    // }catch{(e) => {
      // console.log(e);
      // console.log("Hello");
    // };
    return gettingIt
  }
    // i++;
  // }
// };
// }
// main()
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
// main();
const sleep = async(milli) =>{
  return new Promise(resolve=>setTimeout(resolve, milli))
}
const sendIt = async(req, res)=>{
  const getData = await getNewData()
  let datafrom = await dbConnect()
  // console.log(getData)
  for(i=0;i<getData.length;i++){
    if(!getData[i].simplified){
      let data = getData[i]
      await axios.post("http://127.0.0.1:5000/get",data)
      // console.log(options.body)
      // request.post('http://127.0.0.1:5000/get', options)
      // await sleep(300000)
      axios.get("http://127.0.0.1:5000/get").then(async(data)=>{
        console.log(data)
        console.log(data.news)
        let hindiNews = await main(data)
              console.log("This is hindinews"+hindiNews)
              await datafrom.updateOne({heading:data.heading},{
                  $set: {
                      news: data.news,
                      hheading:hindiNews.heading,
                      hnews:hindiNews.news,
                      hsource: hindiNews.source,
                      simplify: data.simplify,
                      simplified: true,
                      hsimplified: hindiNews.simplified
                    }
                    
                  }
                  )
      }).catch((e)=>{console.log(e)})
      // request('http://127.0.0.1:5000/get',async function (error, response, body) {
      // console.error('error:', error);
      // console.log('statusCode:', response && response.statusCode);
    // let bodyy = JSON.parse(body)
      // console.log(body)
//       console.log(bodyy.news)
//       console.log(bodyy.heading)
          
        // })
      }}
    }
    // }
      sendIt()
      app.get("/", async(req, res) => {
        const getData = await getNewData();
        res.send(getData)
        
      })
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
