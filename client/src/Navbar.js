import "./Navbar.css";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import DialogTitle  from '@mui/material/DialogContentText';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Mic from './Mic';

function Navbar(props) {
  const [visible ,setVisible] = useState(false)
    const handleChange = ()=>{
      visible?setVisible(false):setVisible(true)
    }
    const [open, setOpen] = useState(false);
    const [inputText, setInputText] = useState('');
  const handleClickToOpen = () => {
    setOpen(true);
  };
  const handleSearch = (e) => {
    setInputText(e.target.value)
    props.searchWords(inputText)
  }
  const handleToClose = () => {
    setOpen(false);
  };
  return (
    <div className="Nav">
      <div className="menu" onClick={(e)=>{handleChange();
      props.visible(visible)
      }}><MenuIcon/></div>
      <div className="icon"></div>
      <div className="search">
        <img
          src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png"
          alt="Search"
        />
        <input type="text" placeholder="Search News..." onChange={handleSearch}/>
         <KeyboardVoiceIcon sx={{ fontSize: "20px" }}
              onClick={handleClickToOpen}>    
        Open Demo Dialog
      </KeyboardVoiceIcon>
      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{"How are you?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Mic/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToClose} 
                  color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  );
}
export default Navbar;
