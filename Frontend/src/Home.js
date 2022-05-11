import React from "react";
import "./Home.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Route, Switch } from "react-router-dom";
import More from "./More";
function Home() {
  // const topics = [
  //   { id: 0, topic: "All News", category: "all" },
  //   { id: 7, topic: "Education", category: "Education" },
  //   { id: 8, topic: "Business", category: "business" },
  //   { id: 2, topic: "World", category: "world" },
  //   { id: 1, topic: "Tech", category: "technology" },
  //   { id: 3, topic: "Entertainment", category: "entertainment" },
  //   { id: 4, topic: "Sports", category: "sports" },
  //   { id: 6, topic: "Politics", category: "politics" },
  //   { id: 5, topic: "Health", category: "health" },
  //   ];
  // const [currTopic, setCurrTopic] = useState("all");
  // // const findTopic = (topic) => {
  // //   setCurrTopic(topic);
  // // };
  // const [value, setValue] = useState(0);
  // const handleChange = (event , newValue) => {
  //     setValue(newValue);
  //    };
     return (
       <>
      <Navbar/>
      <div className="allContent">
       <Sidebar></Sidebar>
       {/* <Switch> */}
         {/* <Route exact path="/" component={Content}></Route> */}
         
       {/* <Content/> */}
       <More/>
       {/* </Switch> */}
      {/* <div className="content">
        <div className="navigate">
          <Box 
          sx={{ 
            maxWidth: { xs: 240, sm: 481.59,md:718.39, lg:1000},
            bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
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
        />
      </div> */}
      </div>
    </>
  );
}

export default Home;
