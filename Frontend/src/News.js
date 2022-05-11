import React from "react";
import "./News.css";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import ShareIcon from '@mui/icons-material/Share';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
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
            <button className="actionButtons">View More</button>
          </div>
          <div className="actions">
            <StarOutlineIcon margin="4px" fontSize="small xs-10"></StarOutlineIcon>
            <ForumRoundedIcon fontSize="small xs-10"></ForumRoundedIcon>
            <BookmarkAddOutlinedIcon fontSize="small xs-10"></BookmarkAddOutlinedIcon>
            <ShareIcon fontSize="small xs-10"></ShareIcon>
            <VolumeUpIcon fontSize="small xs-10"></VolumeUpIcon>
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
