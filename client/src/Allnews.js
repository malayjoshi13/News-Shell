import React, { useEffect, useState } from "react";
import "./Allnews.css";
import News from "./News";
function Allnews(props) {
  const [newsData, setNewsData] = useState([]);
  const [simplifiedNews, setSimplifiedNews] = useState(false);
  const newsSimplified = "Sri Lanka is facing its worst serious money-based problem since independence with food and fuel shortages, increasing prices, and power cuts affecting a large number of the people, resulting in huge protests over the government's handling of the situation. Earlier today, anti-government protesters set on fire the official residences of Sri Lanka's Moratuwa Mayor Saman Lal Fernando and the MPs Sanath Nishantha, Ramesh Pathirana, Mahipala Herath, Thissa Kuttiarachchi, and Nimal Lanza. Also, Sri Lanka Prime Minister Mahinda Rajapaksa's residence in the city of Kurunegala in the north-western area of governance was set on fire on Monday, hours after the leader gave his resignation from the post of Prime Minister to President Gotabaya Rajapaksa."
  const getNews = async() => {
    try{
    const Data = await fetch('http://127.0.0.1:8000/sumarize');
    const dataNews = await Data.json();
    setNewsData(dataNews);
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
      return <News simplifyText={simplifyIt} title={ele.Headline} 
      date={ele.Date.Time}
      category={ele.Domain} source={ele.Source} content={simplifiedNews?ele.Summarized_News:newsSimplified} image={ele.Image_Url}/>
    })}
    </div>
  );
}

export default Allnews;
