import React, { useEffect, useState } from "react";
import "./Allnews.css";
import './Policies.css';
import News from "./News";
function Policies(props) {
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
  return (
  <div className="policyContainer">
  <div className="policiesContainer">
    {newsData.map((ele)=>{
      return <News title={ele.Headline} 
      date={ele.Date.Time}
      category={ele.Domain} source={ele.Source} content={ele.Summarized_News} image={ele.Image_Url}/>
    })}
    </div>
    </div>
  );
}

export default Policies