import React from "react";
import "./More.css";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import ShareIcon from "@mui/icons-material/Share";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

function More(props) {
  return (
    <div className="moreNews">
      <div className="moreNewsContainer">
        <div className="mNewsContainer">
          <div className="mImage">
            <h2 className="moreHeading">
              Hong Kong unveils $22 billion budget for virus-ridden economy
            </h2>
            <p className="moredate">May 9 &#9679; World &#9679; The Times of India</p>
            <div className="moreImg">
              <img
                src="https://static.toiimg.com/thumb/msid-91450239,imgsize-136062,width-400,resizemode-4/91450239.jpg"
                alt="image"
              ></img>
            </div>
            <div className="actions">
              <StarOutlineIcon fontSize="small xs-10"></StarOutlineIcon>
              <ForumRoundedIcon fontSize="small xs-10"></ForumRoundedIcon>
              <BookmarkAddOutlinedIcon fontSize="small xs-10"></BookmarkAddOutlinedIcon>
              <ShareIcon fontSize="small xs-10"></ShareIcon>
              <VolumeUpIcon fontSize="small xs-10"></VolumeUpIcon>
            </div>
          </div>
          <div className="mainContent">
            <h3 className="moreh3">What?</h3>
            <p className="moreNewsCont">
            Sri Lanka Prime Minister Mahinda Rajapaksa’s residence was set on fire and the country goes through an intensified civil strife amid a crippling economic crisis.
A large number of protestors including the Inter-University Students Federation (IUSF) were out on the streets and attacked the Sri Lanka Mps. The military has been deployed on the roads to maintain calm despite an island-wide curfew.
</p>
            <h3 className="moreh3">Where?</h3>
            <p className="moreNewsCont">
            This incident happened in the capital city of Sri Lanka, Colombo at Kurunegala, the residence city in the north-western province. The fire was set on the official residences of Sri Lanka’s Moratuwa Major Saman Lal Fernando and the Mps.
</p>
            <h3 className="moreh3">Why?</h3>
            <p className="moreNewsCont">
            The residence was set on fire because the Prime Minister tendered his resignation to President Gotabaya Rajapaksa and has called for the formation of an all-party interim government to handle the ongoing economic crisis in the country. The recession is attributed to foreign exchange shortages caused by a fall in tourism during the COVID-19 pandemic, as well as reckless economic policies, like the government’s move last year to ban chemical fertilizers in a bid to make Sri Lanka’s agriculture “100 per cent organic”.
</p>
          </div>
          <div className="backButton">
            <button className="backBtn">
              <a className="backLink" href="/">
                Back
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default More;
