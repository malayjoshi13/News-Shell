import React from 'react'
import './Sidebar.css'
import LanguageIcon from '@mui/icons-material/Language';
import FlagIcon from '@mui/icons-material/Flag';
function Sidebar() {
  return (
    <div className='sideBar'>
      <div className="contNavigation">
        <div className='chooseCont'>
        <div className='chooseContent'><LanguageIcon></LanguageIcon>News</div></div>
        <div className='chooseCont'><div className='chooseContent'><FlagIcon></FlagIcon>Policies</div></div>
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