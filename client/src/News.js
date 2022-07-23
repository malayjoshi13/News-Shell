import React, { useEffect } from "react";
import "./News.css";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import ShareIcon from '@mui/icons-material/Share';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import { Box } from "@material-ui/core";
function News(props) {
  const [simplified, setSimplified] = useState(false)
  const [currStyle, setCurrStyle] = useState('newsContent')
  const simplify = ()=>{
    simplified?setSimplified(false):setSimplified(true);
    simplified?setCurrStyle('newsContent'):setCurrStyle('simplifiedNews newsContent')
  }
  let location = useLocation();
  const handleClick=()=>{
    sessionStorage.setItem('scrollPosition', window.scrollY);
  }
const handleScrollPosition = () => {
  const scroPosition =  sessionStorage.getItem("scrollPosition");
    if (parseInt(scroPosition)>0) {
      window.scrollTo(0, parseInt(scroPosition));
    }
    sessionStorage.removeItem("scrollPosition");
  };
  useEffect(() => {
    handleScrollPosition();
  },[])
  return (
    <div className="newsContainer">
      <div className="mainContainer">
        <div className="newsDiv">
          <div className="newsMain">
            <h1>{props.title}</h1>
            <p className="date">{props.date} &#9679; {props.category} &#9679; {props.source}</p>
            <p className={currStyle}>{props.content}
              </p>
          </div>
          <div className="actionDiv">
            <button className="actionButtons actionSimplify" onClick={()=>{simplify();
            props.simplifyText(simplified)}}>{simplified?<p>{props.getPageLang=='en'?'Original Text':'मूल लेख'}</p>:<p>{props.getPageLang=='en'?'Simplify It':'इसे सरल करें'}</p>}</button>
            <button className="actionButtons " onClick={handleClick}><Link className="moreLink" to={location.pathname==='/'?'news/more':'policies/more'}>{props.getPageLang=='en'?'View More':'और देखें'}</Link></button>
          </div>
          <div className="actions">
            <div className="actionIcons">
            <StarOutlineIcon fontSize="small xs-10"></StarOutlineIcon>
            </div>
            <div className="actionIcons">
            <ForumRoundedIcon fontSize="small xs-10"></ForumRoundedIcon>
            </div>
            <div className="actionIcons">
            <BookmarkAddOutlinedIcon fontSize="small xs-10"></BookmarkAddOutlinedIcon>
            </div>
            <div className="actionIcons">
            <ShareIcon fontSize="small xs-10"></ShareIcon>
            </div>
            <div className="actionIcons">
            <VolumeUpIcon fontSize="small xs-10"></VolumeUpIcon>
            </div>
            </div>
          <div className="readMore">
            <p>{props.getPageLang=='en'?'Read More': ''}<a className="linkSrc" href={props.additionalUrl}>{props.getPageLang=='en'?'Here': 'अधिक पढ़ें'}</a></p>
          </div>
        </div>
        <div className="newsImage">
          <img src={props.image} alt="newsImage"></img>
        </div>
      </div>
    </div>
  );
}

export default News;
