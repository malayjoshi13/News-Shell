import React, { useEffect, useState } from "react";
import "./Allnews.css";
import './Policies.css';
import policiesData from "./PoliciesData";
import News from "./News";
import NoSearch from "./NoSearch";
function Policies(props) {
    const [newsData, setNewsData] = useState([]);
    const simplifyIt = ()=>{}
    var seeLang = props.getpolicyLang
    // const totalPolicySearchData = policiesData.filter(e=>e.Headline.toLowerCase().includes(props.getpolicyWords.toLowerCase()))
  return (
  <div className="policyContainer">
  <div className="policiesContainer">
    {seeLang=='en'?
    // props.getpolicyWords===''?
    policiesData.map((ele)=>{
      return <News title={ele.Headline} 
      date={ele.Date.Time}
      category={ele.Domain} source={ele.Source} content={ele.Summarized_News} simplify={ele.simplified} image={ele.Image_Url} getPageLang={seeLang}/>
    })
  //   :totalPolicySearchData.length?totalPolicySearchData.map((ele)=>{
  //     return <News title={ele.Headline} 
  //     date={ele.Date.Time}
  //     category={ele.Domain} source={ele.Source} content={ele.Summarized_News} simplify={ele.simplified} image={ele.Image_Url} getPageLang={seeLang}/>
  // }):<NoSearch/>
  :
  policiesData.map((ele)=>{
    return <News title={ele.hindiHeading} 
    date={ele.hindiDate}
    category={ele.Domain} source={ele.hindiSource} content={ele.hindiSumarize} simplify={ele.hindiSimplify} image={ele.Image_Url} getPageLang={seeLang}/>
  })}
    </div>
    </div>
  );
}

export default Policies