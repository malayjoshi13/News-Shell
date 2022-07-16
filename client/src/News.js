import React from "react";
import "./News.css";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import ShareIcon from '@mui/icons-material/Share';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Link } from "react-router-dom";
import { useState } from "react";
// import { Box } from "@material-ui/core";
function News(props) {
  const [simplified, setSimplified] = useState(false)
  const [currStyle, setCurrStyle] = useState('newsContent')
  const simplify = ()=>{
    simplified?setSimplified(false):setSimplified(true);
    simplified?setCurrStyle('newsContent'):setCurrStyle('simplifiedNews newsContent')
  }
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
            props.simplifyText(simplified)}}>{simplified?<p>Original Text</p>:<p>Simplify It</p>}</button>
            <button className="actionButtons"><Link className="moreLink" to='/more'>View More</Link></button>
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
            <p>Read More at <a className="linkSrc" href="https://timesofindia.indiatimes.com/world/south-asia/sri-lanka-pm-mahinda-rajapaksas-residence-set-on-fire-in-kurunegala/articleshow/91450247.cms">The Times of India</a></p>
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
