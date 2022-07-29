import React from 'react'
import './Sidebar.css'
import LanguageIcon from '@mui/icons-material/Language';
import FlagIcon from '@mui/icons-material/Flag';
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
function Sidebar(props) {
  const [currLanguge, setCurrLanguage] = useState('en');
  const [view, setView] = useState('News');
  const {pathname} = useLocation();
  // var language = JSON.parse(localStorage.getItem("currentLanguage"))
  var language = sessionStorage.getItem("currentLanguage")
  language?props.checkLang(language):props.checkLang('en')


  return (
    <div className='sideBar'>
      <div className="contNavigation">
      <NavLink exact to='/' isActive={()=>['/','/news/more'].includes(pathname)} activeClassName='chooseContent2' className='chooseCont'><div onClick={()=>{setView('News');props.checkView(view)}}>
        <div className='chooseContent'><LanguageIcon></LanguageIcon>{language=='en'||language==null?'News':
"समाचार"}</div></div></NavLink>
        <NavLink to='/policies' activeClassName='chooseContent2' className='chooseCont'><div onClick={()=>{setView('Policies');props.checkView(view);}}><div className='chooseContent'><FlagIcon></FlagIcon>{language=='en'||language==null?'Policies':
'नीतियाँ'}</div></div></NavLink>
      </div>
      <div className='lang'>
        <div className='langChoose'>
        <p>{language=='en'||language==null?'Choose Language':
'भाषा चुनें'}</p>
        <select className='selectLang' onChange={e=>{
        // localStorage.setItem("currentLanguage",JSON.stringify(e.target.value))
        sessionStorage.setItem("currentLanguage",e.target.value)
        setCurrLanguage(e.target.value)
        }}>
          <option value="en">{language=='en'||language==null?'English(India)':'अंग्रेजी(भारत)'}</option>
          <option value="hi">{language=='en'||language==null?'Hindi(India)':'हिंदी(भारत)'}</option>
        </select>
        </div>
      </div>
    </div>
  )
}

export default Sidebar