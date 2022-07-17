import React, { useEffect, useState } from "react";
import "./Allnews.css";
import News from "./News";
import axios from 'axios';
import NoSearch from "./NoSearch";
function Allnews(props) {
  const [newsData, setNewsData] = useState([]);
  const [simplifiedNews, setSimplifiedNews] = useState(false);
  const [currNews, setCurrNews] = useState('');
  const newsSimplified = "Sri Lanka is facing its worst serious money-based problem since independence with food and fuel shortages, increasing prices, and power cuts affecting a large number of the people, resulting in huge protests over the government's handling of the situation. Earlier today, anti-government protesters set on fire the official residences of Sri Lanka's Moratuwa Mayor Saman Lal Fernando and the MPs Sanath Nishantha, Ramesh Pathirana, Mahipala Herath, Thissa Kuttiarachchi, and Nimal Lanza. Also, Sri Lanka Prime Minister Mahinda Rajapaksa's residence in the city of Kurunegala in the north-western area of governance was set on fire on Monday, hours after the leader gave his resignation from the post of Prime Minister to President Gotabaya Rajapaksa."
  console.log(props.viewInput);
  const getTranslate = () => {
    // curl -X POST "https://libretranslate.com/translate" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=Hello&source=en&target=es&format=text"
    const langSource = props.viewLang=='en'?'hi':'en';
    const params = new URLSearchParams();
    params.append('q', 'Hello');
    // params.append('source', langSource);
    params.append('source', 'en');
    // params.append('target', props.viewLang);
    params.append('target', 'hi');
    // params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
    params.append('api_key', '');
    axios.post('https://libretranslate.com/translate', {
      q:"Hello",
      // source: langSource,
      source: 'en',
      // target: props.viewLang,
      target: 'hi',
      // api_key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
      api_key: ''
    },{
      headers: {
        'accept': 'application/json',
        'Content-type': 'application/x-www-form-urlencoded'
      },
    }).then(res=>{
      console.log(res.data)
    }).catch(e=>console.log(e))
  }
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
  console.log(props.viewLang)
  useEffect(() => {
    getNews();
    getTranslate();
    },[]);
    const totalData = props.topic==='all'?newsData:newsData.filter(element=>element.Domain===props.topic)
    const totalSearchData = totalData.filter(e=>e.Headline.toLowerCase().includes(props.viewInput.toLowerCase()))
  const simplifyIt = (e) => {
    setSimplifiedNews(e)
  }
  console.log(totalSearchData.length);
  return (<div className="container">
    {props.viewInput===''?totalData.map((ele)=>{
      const totalNews = simplifiedNews?ele.Summarized_News:newsSimplified;
      return <News simplifyText={simplifyIt} title={ele.Headline} 
      date={ele.Date.Time}
      category={ele.Domain} source={ele.Source} content={totalNews} image={ele.Image_Url}/>
    }):
    totalSearchData.length ? totalSearchData.map((ele)=>{
      const totalSearchNews = simplifiedNews?ele.Summarized_News:newsSimplified;
      return <News simplifyText={simplifyIt} title={ele.Headline} 
      date={ele.Date.Time}
      category={ele.Domain} source={ele.Source} content={totalSearchNews} image={ele.Image_Url}/>
    }):<NoSearch/>}
    </div>
  );
}

export default Allnews;
