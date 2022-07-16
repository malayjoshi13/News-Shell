import React from 'react'
import './Sidebar.css'
import LanguageIcon from '@mui/icons-material/Language';
import FlagIcon from '@mui/icons-material/Flag';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
function Sidebar(props) {
  const [currLanguge, setCurrLanguage] = useState('English');
  return (
    <div className='sideBar'>
      <div className="contNavigation">
      <NavLink exact to='/' activeClassName='chooseContent2' className='chooseCont'><div >
        <div className='chooseContent'><LanguageIcon></LanguageIcon>News</div></div></NavLink>
        <NavLink exact to='/policies' activeClassName='chooseContent2' className='chooseCont'><div ><div className='chooseContent'><FlagIcon></FlagIcon>Policies</div></div></NavLink>
      </div>
      <div className='lang'>
        <div className='langChoose'>
        <p>Choose Language</p>
        <select className='selectLang' onChange={e=>{setCurrLanguage(e.target.value);
        props.checkLang(currLanguge)}}>
          <option value="en">English(India)</option>
          <option value="hi">Hindi(India)</option>
        </select>
        </div>
      </div>
    </div>
  )
}

export default Sidebar