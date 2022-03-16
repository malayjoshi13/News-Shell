import React, { useEffect, useState } from "react";
import "./Allnews.css";
import axios from "axios";
import News from "./News";
function Allnews(props) {
  const [newsData, setNewsData] = useState();
  
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/sumarize`)
      .then((res) => {
        const Data = res.data;
        setNewsData(Data);
      })
      .catch((err) => {
        console.log(err);
      });
    }, []);
    
  const newsArr = Object.values(newsData.data);
  const categoryData = newsArr.filter(element=>element.Domain===props.topic)
  const totalData = 
  props.topic==='all'?
  Object.values(newsData.data)
  :
  categoryData;
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
