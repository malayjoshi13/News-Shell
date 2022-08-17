import React, { useEffect } from "react";
import "./News.css";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import ShareIcon from '@mui/icons-material/Share';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useSpeechSynthesis } from 'react-speech-kit';

import img from "../src/newsDefault.png"
// import { Box } from "@material-ui/core";
function News(props) {
  const [simplified, setSimplified] = useState(false)
  const { speak , voices} = useSpeechSynthesis();
  let location = useLocation();
  const handleClick=()=>{
    sessionStorage.setItem('scrollPosition', window.scrollY);
  }
  props.simplifyText(simplified)
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

  const [open, setOpen] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const handleClickToOpen = () => {
    setOpen(true);
  };
  
  const handleToClose = () => {
    setOpen(false);
  };
  const speakEnglish = (title,content) =>{
    if(speaking == false){
      setSpeaking(true)
      console.log(voices[1])
      speak({ text: title , voice : voices[1] });
      speak({ text: content , voice : voices[1] });
      setSpeaking(false)
    }
  }
  const speakHindi = (title,content) =>{
    if(speaking == false){
      setSpeaking(true)
      console.log(voices)
      speak({ text: title , voice : voices[10] });
      speak({ text: content , voice : voices[10] });
      setSpeaking(false)
    }
  }
  return (
    <div className="newsContainer">
      <div className="mainContainer">
        <div className="newsDiv">
          <div className="newsMain">
            <h1>{props.title}</h1>
            <p className="date">{props.date}  {props.category}  <br></br>{props.source}</p>
            <p className="newsContent">{props.description}
              </p>
              {simplified?<div className="ribbon">
              <p>Simplified News</p>
              <p className="ribbonIn"></p>
              </div>:''}
            <p className="newsContent">{props.content}
              </p>
          </div>
          <div className="actionDiv">
            <button className="actionButtons actionSimplify" onClick={(e)=>{
              simplified?setSimplified(false):setSimplified(true)
            }}>{simplified?<p>{props.getPageLang=='en'?'Original Text':'मूल लेख'}</p>:<p>{props.getPageLang=='en'?'Simplify It':'इसे सरल करें'}</p>}</button>
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
            <VolumeUpIcon fontSize="small xs-10" onClick={props.getPageLang ==='en'?speakEnglish.bind(this,props.title,props.content):speakHindi.bind(this,props.title,props.content)}></VolumeUpIcon>
            </div>
            </div>
          <div className="readMore">
            <p>{props.getPageLang=='en'?'Read More': ''}<a className="linkSrc" onClick={handleClickToOpen}>{props.getPageLang=='en'?'Here': 'अधिक पढ़ें'}</a></p>
            {/* <p>Read More <a className="linkSrc" onClick={handleClickToOpen}>Here</a></p> */}
            <Dialog fullScreen open={open} onClose={handleToClose}>
              <DialogActions>
                <Button onClick={handleToClose} 
                        color="primary" autoFocus>
                  Close
                </Button>
              </DialogActions>
              <DialogContent>
                <DialogContentText>
                  <iframe class="iframe" src={props.additionalUrl}></iframe>
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="newsImage">
          <img src={props.image?props.image:img} alt="newsImage"></img>
        </div>
      </div>
    </div>
  );
}

export default News;
