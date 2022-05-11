import React from "react";
import "./News.css";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import ShareIcon from '@mui/icons-material/Share';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Link } from "react-router-dom";
// import { Box } from "@material-ui/core";
function News(props) {
  return (
    <div className="newsContainer">
      <div className="mainContainer">
        <div className="newsDiv">
          <div className="newsMain">
            <h1>{props.title}</h1>
            <p className="date">{props.date} &#9679; {props.category} &#9679; {props.source}</p>
            <p className="newsContent">{props.content}
              </p>
          </div>
          <div className="actionDiv">
            <button className="actionButtons">Simplify It</button>
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
            <p>Read More at <a className="linkSrc" href="">Hindustan.com</a></p>
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
