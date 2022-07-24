import "./Navbar.css";
import { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
const SpeechRecognition = window.SpeechRecognition||window.webkitSpeechRecognition
const mic = new SpeechRecognition()
mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';
function Navbar(props) {
  const [visible ,setVisible] = useState(false)
  const [listening ,setListening] = useState(false)
  const [note ,setNotes] = useState('')
    const handleChange = ()=>{
      visible?setVisible(false):setVisible(true)
    }
    const [open, setOpen] = useState(false);
    const [inputText, setInputText] = useState('');
useEffect(()=>{handleOpen()},[])
  const handleClickToOpen = () => {
    setOpen(true);
  };
  const handleToClose = () => {
    setOpen(false);
  };
  const handleOpen=()=>{
    mic.start()
  }
  mic.onresult=(e)=>{
    const trans = e.results[0][0].transcript;
    console.log(trans);
    setNotes(trans);
    setInputText(note);
    mic.onerror = e => {
      console.log(e.error);
    }
  }
  const handleVoiceSearch=()=>{
    props.searchWords(inputText);
  }
  const handleNote= ()=>{
    mic.stop()
    if(note!=''){
      document.getElementById('searchIt').value = note
        console.log("Ye band hone pr"+ inputText)
        props.searchWords(inputText);
    }
  }
  const handleSearch = (e) => {
    setInputText(e.target.value);
    handleVoiceSearch();
  }
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
        <input type="text" id="searchIt" placeholder={props.getSearchLang=='en'?'Search News...':'समाचार खोजें...'} onChange={handleSearch} />
         {listening?

         <KeyboardVoiceIcon sx={{ fontSize: "20px" }}
              // onClick={()=>{handleOpen();
              //   setListening(true)}} 
              onClick={()=>{handleNote();
                setListening(false);}} 
              style={{ color: 'red' , cursor:'pointer'}}
              >    
      </KeyboardVoiceIcon>:<KeyboardVoiceIcon sx={{ fontSize: "20px" }}
              onClick={()=>{handleOpen();
                setListening(true)}} 
                style={{cursor:'pointer'}}
              >    
      </KeyboardVoiceIcon>}
       {open?<div>
        <button onClick={()=>{handleOpen();setListening(true)}}>Start Recording</button>
        <button onClick={()=>{handleNote();
          setListening(false);}} >Stop Recording</button>
          <button onClick={()=>{handleVoiceSearch();}}>Search</button>
      </div>:''}
      {/* <Dialog open={open} onClose={handleToClose}>
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
      </Dialog> */}
      </div>
    </div>
  );
    }
export default Navbar;
