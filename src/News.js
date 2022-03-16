import React from "react";
import "./News.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
          <div className="actions">
            <img
              src="https://img.icons8.com/windows/96/4C4E52/star--v1.png"
              alt="like"
            />
            <img
              src="https://img.icons8.com/ios/100/g9g9/topic.png"
              alt="comment"
            />
            <img
              src="https://img.icons8.com/material-outlined/100/4C4E52/bookmark-ribbon--v1.png"
              alt="bookmark"
            />
            <img
              src="https://img.icons8.com/ios-glyphs/480/4C4E52/share--v1.png"
              alt="share"
            />
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
