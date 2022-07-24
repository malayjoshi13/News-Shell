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
  const [currLang, setCurrlang] = useState('English')
  const [currWords, setCurrWords] = useState('')
  const handleMenu = (visible)=>{
    setShow(visible)
    console.log(visible)
  }
  const checkingLang = (e) => {
    setCurrlang(e)
  }
  const inputWords = (e) => {
    setCurrWords(e)
  }
  return (
       <>
      <Navbar visible={handleMenu} searchWords={inputWords} getSearchLang={currLang}/>
      <div className="allContent">
       <Sidebar checkLang={checkingLang}></Sidebar>
       {show?<div className="show"><SidebarMobile checkLang={checkingLang}></SidebarMobile></div>:''}

       <Switch>
         <Route exact path="/">
          <Content getLang={currLang} getWords={currWords}/>
         </Route>
         <Route exact path="/more">
          <More />
         </Route>
         <Route exact path="/news/more">
          <More />
         </Route>
         <Route exact path="/policies/more">
          <More />
         </Route>
         <Route exact path="/policies" component={Policies}></Route>
       </Switch>
      </div>
    </>
  );
}

export default Home;
