import React from 'react'
import './Sidebar.css'
import LanguageIcon from '@mui/icons-material/Language';
import FlagIcon from '@mui/icons-material/Flag';
import { NavLink } from 'react-router-dom';
function Sidebar() {
  return (
    <div className='sideBar'>
      <div className="contNavigation">
      <NavLink exact to='/' activeClassName='chooseContent2' className='chooseCont'><div >
        <div className='chooseContent'><LanguageIcon></LanguageIcon>News</div></div></NavLink>
        <NavLink exact to='/policies' activeClassName='chooseContent2' className='chooseCont'><div ><div className='chooseContent'><FlagIcon></FlagIcon>Policies</div></div></NavLink>
      </div>
      <div className='lang'>
        <div className='langChoose'>
        <p>Change Language</p>
        <select className='selectLang'>
          <option>English(India)</option>
          <option>Hindi(India)</option>
        </select>
        </div>
      </div>
    </div>
  )
}

export default Sidebar