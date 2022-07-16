import React, { useEffect, useState } from "react";
import "./Allnews.css";
import News from "./News";
function Allnews(props) {
  const [newsData, setNewsData] = useState([]);
  const [simplifiedNews, setSimplifiedNews] = useState(false);
  const newsSimplified = "Sri Lanka is facing its worst serious money-based problem since independence with food and fuel shortages, increasing prices, and power cuts affecting a large number of the people, resulting in huge protests over the government's handling of the situation. Earlier today, anti-government protesters set on fire the official residences of Sri Lanka's Moratuwa Mayor Saman Lal Fernando and the MPs Sanath Nishantha, Ramesh Pathirana, Mahipala Herath, Thissa Kuttiarachchi, and Nimal Lanza. Also, Sri Lanka Prime Minister Mahinda Rajapaksa's residence in the city of Kurunegala in the north-western area of governance was set on fire on Monday, hours after the leader gave his resignation from the post of Prime Minister to President Gotabaya Rajapaksa."
  const getNews = async() => {
    try{
    const Data = await fetch('https://newsapi.org/v2/top-headlines?country=in&apiKey=155c1629e9894008b694cc584a348551');
    const dataNews = await Data.json();
    console.log(typeof(dataNews.articles));
    console.log(dataNews);
    console.log(dataNews.articles[0]);
    setNewsData(dataNews.articles)
  }catch(e){
      console.log(e);
    }
  }
  useEffect(() => {
    getNews();
    },[]);
  const totalData = props.topic==='all'?newsData:newsData.filter(element=>element.Domain===props.topic)
  const simplifyIt = (e) => {
    setSimplifiedNews(e)
  }
  return (<div className="container">
    {totalData.map((ele)=>{
      return <News simplifyText={simplifyIt} title={ele.title} 
      date={ele.publishedAt}
      // category={ele.Domain} 
      source={ele.url} 
      // content={simplifiedNews?ele.Summarized_News:newsSimplified} 
      content = {ele.description}
      image={ele.urlToImage}
      additionalUrl = {ele.url}/>
    })}
    </div>
  );
}

export default Allnews;
