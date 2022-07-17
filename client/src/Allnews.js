import React, { useEffect, useState } from "react";
import "./Allnews.css";
import News from "./News";
function Allnews(props) {
  const [newsData, setNewsData] = useState([]);
  const [simplifiedNews, setSimplifiedNews] = useState(false);
  const newsSimplified = "Sri Lanka is facing its worst serious money-based problem since independence with food and fuel shortages, increasing prices, and power cuts affecting a large number of the people, resulting in huge protests over the government's handling of the situation. Earlier today, anti-government protesters set on fire the official residences of Sri Lanka's Moratuwa Mayor Saman Lal Fernando and the MPs Sanath Nishantha, Ramesh Pathirana, Mahipala Herath, Thissa Kuttiarachchi, and Nimal Lanza. Also, Sri Lanka Prime Minister Mahinda Rajapaksa's residence in the city of Kurunegala in the north-western area of governance was set on fire on Monday, hours after the leader gave his resignation from the post of Prime Minister to President Gotabaya Rajapaksa."
  const getNews = async() => {
    try{
    const Data = await fetch('https://newsdata.io/api/1/news?apikey=pub_92827e3c0b4e56d836a972b6004297158542&country=in&language=en');
    const dataNews = await Data.json();
    console.log(typeof(dataNews.results));
    console.log(dataNews);
    console.log(dataNews.results[0]);
    setNewsData(dataNews.results)
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
      date={ele.pubDate}
      // category={ele.Domain} 
      source={ele.source_id} 
      // content={simplifiedNews?ele.Summarized_News:newsSimplified} 
      description = {ele.description}
      content = {ele.content}
      image={ele.image_url}
      additionalUrl = {ele.link}/>
    })}
    </div>
  );
}

export default Allnews;


// pub_92827e3c0b4e56d836a972b6004297158542