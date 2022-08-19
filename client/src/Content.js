import React, { useEffect } from 'react'
import { useState } from "react";
import Allnews from "./Allnews";
import "./Content.css"
import Navbar from "./Navbar";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Sidebar from "./Sidebar";
function Content(props) {
  var seeLang = props.getLang;
  var viewWords = props.getWords;
    const topics = [
        { id: 0, topic: "Top Headlines", category: "top" },
        { id: 1, topic: "Business", category: "business" },
        { id: 2, topic: "Education", category: "science" },
        { id: 3, topic: "Entertainment", category: "entertainment" },
        { id: 4, topic: "Health", category: "health" },
        { id: 5, topic: "Politics", category: "politics" },
        { id: 6, topic: "Sports", category: "sports" },
        { id: 7, topic: "Tech", category: "technology" },
        { id: 8, topic: "World", category: "world" },
        ];
  const hindiTopics = [
        { id: 0, topic: "सभी समाचार", category: "top" },
        { id: 1, topic: "व्यापार", category: "business" },
        { id: 2, topic: "शिक्षा", category: "science" },
        { id: 3, topic: "मनोरंजन", category: "entertainment" },
        { id: 4, topic: "स्वास्थ्य", category: "health" },
        { id: 5, topic: "राजनीति", category: "politics" },
        { id: 6, topic: "खेल", category: "sports" },
        { id: 7, topic: "तकनीक", category: "technology" },
        { id: 8, topic: "दुनिया", category: "world" },
        ];
        // useEffect(()=>{
        //   localStorage.removeItem("currentLanguage")
        // })
      // const [currTopic, setCurrTopic] = useState("top");
      let gettingTopic = sessionStorage.getItem('currentTopic')
      let getcurrTopic = gettingTopic==null?'top':gettingTopic
      const [currTopic, setCurrTopic] = useState(getcurrTopic);
      // const findTopic = (topic) => {
        //   setCurrTopic(topic);
        // };
        useEffect(()=>{
          topics.map((ele)=>{
            if(currTopic===ele.category){
              setValue(parseInt(ele.id))
            }
          })
        },[currTopic])
        const [value, setValue] = useState(0);
        
        // const [currTab, setCurrTab] = useState(getcurrTopic);
      let currentTopic = sessionStorage.getItem("currentTopic")
      // topics.map((e)=>{
      //     if(e.category==currentTopic){
      //       setValue(e.id)
      //     }
      //   })
      const handleChange = (event , newValue) => {
        setValue(newValue);
      };
      // const seeNews = (e) =>{
        // console.log(e)
        // }
  return (
    <div className="content">
        <div className="navigate">
          <Box 
          sx={{ 
            maxWidth: { xs: 350, sm: 581.59,md:618.39, lg:1000},
            bgcolor: 'background.paper' }}>
      <Tabs
        // value="BUSINESS"
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        className='tabs'
        >
        {seeLang==='en'?topics.map((e) => {
          return (
            <Tab
            onClick={()=>{setCurrTopic(e.category)}}
            label={<span className="topicTabs">{e.topic}</span>}/>
              );
            }):hindiTopics.map((e) => {
              return (
                <Tab
                onClick={()=>{setCurrTopic(e.category)}}
                    label={<span className="topicTabs">{e.topic}</span>}/>
                  );
                })}
        </Tabs>
    </Box>
        </div>
        <Allnews 
        topic={currTopic} 
        viewInput = {viewWords}
        viewLang={seeLang}
        />
      </div>
  )
}

export default Content