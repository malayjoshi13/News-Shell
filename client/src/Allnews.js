import React, { useEffect, useState } from "react";
import "./Allnews.css";
import News from "./News";
import NoSearch from "./NoSearch";
import axios from 'axios';
import translate from "translate";

translate.engine = "google";

function Allnews(props) {
  const [newsData, setNewsData] = useState([]);
  const [simplifiedNews, setSimplifiedNews] = useState(false);
  const [hindi, setHindi] = useState([]);
  var currLang = props.viewLang;
  sessionStorage.setItem("currentTopic", props.topic)
  const newsSimplified = "Sri Lanka is facing its worst serious money-based problem since independence with food and fuel shortages, increasing prices, and power cuts affecting a large number of the people, resulting in huge protests over the government's handling of the situation. Earlier today, anti-government protesters set on fire the official residences of Sri Lanka's Moratuwa Mayor Saman Lal Fernando and the MPs Sanath Nishantha, Ramesh Pathirana, Mahipala Herath, Thissa Kuttiarachchi, and Nimal Lanza. Also, Sri Lanka Prime Minister Mahinda Rajapaksa's residence in the city of Kurunegala in the north-western area of governance was set on fire on Monday, hours after the leader gave his resignation from the post of Prime Minister to President Gotabaya Rajapaksa."

  const getNews = async() => {
    try{
    const Data = await fetch(
      `https://newsdata.io/api/1/news?apikey=pub_930227b420d2d7e030700ff57726ca453f8a&country=in&language=en&category=${sessionStorage.getItem("currentTopic")}`
      // `https://newsdata.io/api/1/news?apikey=pub_92827e3c0b4e56d836a972b6004297158542&country=in&language=en&category=${sessionStorage.getItem("currentTopic")}`
    ,{
      mode : 'cors'
    });
    console.log(sessionStorage.getItem("currentTopic"))
    // console.log(Data);
    const dataNews = await Data.json();
    // console.log(dataNews);
    setNewsData(dataNews.results)
  }catch(e){
    console.log(e);
  }
  }
  const translateText=async()=>{
    let i = 0
    let arrayNews = [] 
    while(i<newsData.length){
    let text = await translate(JSON.stringify(newsData[i].Domain), "hi");
    let head = await translate(JSON.stringify(newsData[i].title), "hi");
    let News = await translate(JSON.stringify(newsData[i].content), "hi");
    let source = await translate(JSON.stringify(newsData[i].source_id), "hi");
    let newsDate = await translate(JSON.stringify(newsData[i].pubDate), "hi");
    console.log(newsData[i])
    let obj1 = {
      Domain: text.replace(/['"]+/g, ''),
      Headline: head.replace(/['"]+/g, ''),
      News: News.replace(/['"]+/g, ''),
      Source: source.replace(/['"]+/g, ''),
      imageUrl: newsData[i].Image_Url,
      newsDate: newsDate.replace(/['"]+/g, ''),
      additionalUrl:newsData[i].link
    }
    arrayNews.push(obj1);
    console.log(arrayNews)
    i++
  }
  setHindi(arrayNews)
  }
  console.log(hindi)  
  useEffect(async() => {
   await getNews();
    await translateText();
  },[props.topic, currLang]);
  // const totalData = props.topic==='all'?newsData:newsData.filter(element=>element.Domain===props.topic)
  const totalSearchData = newsData.filter(e=>e.title.toLowerCase().includes(props.viewInput.toLowerCase()))
  const simplifyIt = (e) => {
    setSimplifiedNews(e)
  }

return (<div className="container">
    {currLang=='en'?props.viewInput===''?newsData.map((ele)=>{
      const totalNews = simplifiedNews?newsSimplified:ele.content;
      return <News simplifyText={simplifyIt} title={ele.title} 
      date={ele.pubDate}
      category={ele.Domain} source={ele.source_id} content={totalNews} image={ele.image_url} additionalUrl={ele.link} getPageLang={currLang}
      />
    }):
    totalSearchData.length ? totalSearchData.map((ele)=>{
      const totalSearchNews = simplifiedNews?newsSimplified:ele.content;
      return <News simplifyText={simplifyIt} title={ele.title} 
      date={ele.pubDate}
      category={ele.Domain} source={ele.source_id} content={totalSearchNews} image={ele.image_url} additionalUrl={ele.link} getPageLang={currLang}/>
    }):<NoSearch/>:
    hindi.map((ele)=>{
      return <News simplifyText={simplifyIt} title={ele.Headline} date={ele.newsDate} category={ele.Domain} getPageLang={currLang} additionalUrl={ele.additionalUrl} source={ele.Source} content={ele.News} image={ele.imageUrl} />
    })
  }
  </div>
  );
}

export default Allnews;


// pub_92827e3c0b4e56d836a972b6004297158542
// pub_930227b420d2d7e030700ff57726ca453f8a