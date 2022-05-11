import React from 'react'
import './More.css'
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import ShareIcon from '@mui/icons-material/Share';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

function More(props) {
  return (
    <div className='moreNews'>
        <div className='moreNewsContainer'>
        <div className='mNewsContainer'>
            <div className='mImage'>
        <h2 className='moreHeading'>Hello</h2>
            <p className="moredate">date &#9679; category &#9679; source</p>
              <div className='moreImg'>
                  <img src='https://picsum.photos/seed/picsum/500/500'></img>
              </div>
          <div className="actions">
            <StarOutlineIcon margin="4px" fontSize="small xs-10"></StarOutlineIcon>
            <ForumRoundedIcon fontSize="small xs-10"></ForumRoundedIcon>
            <BookmarkAddOutlinedIcon fontSize="small xs-10"></BookmarkAddOutlinedIcon>
            <ShareIcon fontSize="small xs-10"></ShareIcon>
            <VolumeUpIcon fontSize="small xs-10"></VolumeUpIcon>
            </div>
            </div>
            <div className='mainContent'>
            <h3 className='moreh3'>What?</h3>
            <p className='moreNewsCont'>The much awaited class 10 term-1 board exam results and term-2 datesheet for classes 10 and 12 were released this week. However, the class 10 term-1 results were declared with a twist this time. Meanwhile, several other state boards such as BSEB,BOSE, WBC HSE, UP Board and more also released several notifications regarding datesheets, answer keys, revision of exam schedule and more. Several important notifications from NEET were also released this week, and results for UCEED, CEED, and registrations for other competitive exams also opened. A lot happened in education this week — here’s a recap: One of the</p>
            <h3 className='moreh3'>Where?</h3>
            <p className='moreNewsCont'>fdhijsbl</p>
            <h3 className='moreh3'>Why?</h3>
            <p className='moreNewsCont'>fdhijsbl</p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default More;