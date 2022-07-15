import React from "react";
import "./Home.css";
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import More from "./More";
import SidebarMobile from "./SidebarMobile";
import Content from './Content'
import Policies from "./Policies";
function Home() {
  const [show, setShow] = useState(false)
  const handleMenu = (visible)=>{
    setShow(visible)
    console.log(visible)
  }
     return (
       <>
      <Navbar visible={handleMenu}/>
      <div className="allContent">
       <Sidebar></Sidebar>
       {show?<div className="show"><SidebarMobile></SidebarMobile></div>:''}
       <Switch>
         <Route exact path="/" component={Content}></Route>
         <Route exact path="/more" component={More}></Route>
         <Route exact path="/policies" component={Policies}></Route>
       </Switch>
      </div>
    </>
  );
}

export default Home;
