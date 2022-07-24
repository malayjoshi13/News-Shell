import React from 'react'
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
      const [currTopic, setCurrTopic] = useState("top");
      // const findTopic = (topic) => {
      //   setCurrTopic(topic);
      // };
      const [value, setValue] = useState(0);
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
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        className='tabs'
        >
        {topics.map((e) => {
          return (
            <Tab
            onClick={()=>{setCurrTopic(e.category)}}
                label={e.topic}/>
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