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
  var language = JSON.parse(localStorage.getItem("currentLanguage"))
  console.log(language)
  props.checkLang(currLanguge);
  return (
    <div className='sideBar'>
      <div className="contNavigation">
      <NavLink exact to='/' isActive={()=>['/','/news/more'].includes(pathname)} activeClassName='chooseContent2' className='chooseCont'><div onClick={()=>{setView('News');props.checkView(view)}}>
        <div className='chooseContent'><LanguageIcon></LanguageIcon>{currLanguge=='en'?'News':
"समाचार"}</div></div></NavLink>
        <NavLink to='/policies' activeClassName='chooseContent2' className='chooseCont'><div onClick={()=>{setView('Policies');props.checkView(view);}}><div className='chooseContent'><FlagIcon></FlagIcon>{currLanguge=='en'?'Policies':
'नीतियाँ'}</div></div></NavLink>
      </div>
      <div className='lang'>
        <div className='langChoose'>
        <p>{currLanguge=='en'?'Choose Language':
'भाषा चुनें'}</p>
        <select className='selectLang' onChange={e=>{
        // localStorage.setItem("currentLanguage",JSON.stringify(e.target.value))
        setCurrLanguage(e.target.value)
        }}>
          <option value="en">{currLanguge=='en'?'English(India)':'अंग्रेजी(भारत)'}</option>
          <option value="hi">{currLanguge=='en'?'Hindi(India)':'हिंदी(भारत)'}</option>
        </select>
        </div>
      </div>
    </div>
  )
}

export default Sidebar