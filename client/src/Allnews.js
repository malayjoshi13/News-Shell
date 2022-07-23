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
  const newsSimplified = "Sri Lanka is facing its worst serious money-based problem since independence with food and fuel shortages, increasing prices, and power cuts affecting a large number of the people, resulting in huge protests over the government's handling of the situation. Earlier today, anti-government protesters set on fire the official residences of Sri Lanka's Moratuwa Mayor Saman Lal Fernando and the MPs Sanath Nishantha, Ramesh Pathirana, Mahipala Herath, Thissa Kuttiarachchi, and Nimal Lanza. Also, Sri Lanka Prime Minister Mahinda Rajapaksa's residence in the city of Kurunegala in the north-western area of governance was set on fire on Monday, hours after the leader gave his resignation from the post of Prime Minister to President Gotabaya Rajapaksa."
  // ("https://libretranslate.com/translate")
  const getNews = async() => {
    try{
    // const Data = await fetch('https://newsapi.org/v2/top-headlines?country=in&apiKey=155c1629e9894008b694cc584a348551');
    const Data = await fetch('http://127.0.0.1:8000/sumarize');
    const dataNews = await Data.json();
    // console.log(typeof(dataNews.articles));
    // console.log(dataNews.articles[0]);
    setNewsData(dataNews);
  }catch(e){
    console.log(e);
  }
}
const translateText=async()=>{
  let i = 0
  let arrayNews = [] 
  while(i<newsData.length){
  let text = await translate(JSON.stringify(newsData[i].Domain), "hi");
  let head = await translate(JSON.stringify(newsData[i].Headline), "hi");
  let News = await translate(JSON.stringify(newsData[i].Summarized_News), "hi");
  let source = await translate(JSON.stringify(newsData[i].Source), "hi");
  let newsDate = await translate(JSON.stringify(newsData[i].Date.Time), "hi");
  let obj1 = {
    Domain: text.replace(/['"]+/g, ''),
    Headline: head.replace(/['"]+/g, ''),
    News: News.replace(/['"]+/g, ''),
    Source: source.replace(/['"]+/g, ''),
    imageUrl: newsData[i].Image_Url,
    newsDate: newsDate.replace(/['"]+/g, ''),
  }
  arrayNews.push(obj1);
  console.log(arrayNews)
  i++
}
setHindi(arrayNews)
}
console.log(hindi)
useEffect(() => {
  getNews();
  translateText();
}
,[newsData]);
const totalData = props.topic==='all'?newsData:newsData.filter(element=>element.Domain===props.topic)
const totalSearchData = totalData.filter(e=>e.Headline.toLowerCase().includes(props.viewInput.toLowerCase()))
const simplifyIt = (e) => {
  setSimplifiedNews(e)
}

return (<div className="container">
    {currLang=='en'?props.viewInput===''?totalData.map((ele)=>{
      const totalNews = simplifiedNews?ele.Summarized_News:newsSimplified;
      return <News simplifyText={simplifyIt} title={ele.Headline} 
      date={ele.Date.Time}
      category={ele.Domain} source={ele.Source} content={totalNews} image={ele.Image_Url} getPageLang={currLang}
      />
    }):
    totalSearchData.length ? totalSearchData.map((ele)=>{
      const totalSearchNews = simplifiedNews?ele.Summarized_News:newsSimplified;
      return <News simplifyText={simplifyIt} title={ele.Headline} 
      date={ele.Date.Time}
      category={ele.Domain} source={ele.Source} content={totalSearchNews} image={ele.Image_Url} getPageLang={currLang}/>
    }):<NoSearch/>:
    hindi.map((ele)=>{
      return <News simplifyText={simplifyIt} title={ele.Headline} date={ele.newsDate} category={ele.Domain} getPageLang={currLang} source={ele.Source} content={ele.News} image={ele.imageUrl} />
    })}
    </div>
  );
}

export default Allnews;
