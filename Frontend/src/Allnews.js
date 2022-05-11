import React, { useEffect, useState } from "react";
import "./Allnews.css";
import News from "./News";
function Allnews(props) {
  const [newsData, setNewsData] = useState([]);
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
  return (<div className="container">
    {totalData.map((ele)=>{
      return <News title={ele.Headline} 
      date={ele.Date.Time}
      category={ele.Domain} source={ele.Source} content={ele.Summarized_News} image={ele.Image_Url}/>
    })}
    </div>
  );
}

export default Allnews;
