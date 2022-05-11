import "./Navbar.css";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
function Navbar(props) {
  const [visible ,setVisible] = useState(false)
    const handleChange = ()=>{
      visible?setVisible(false):setVisible(true)
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
        <input type="text" placeholder="Search News..." />
      </div>
    </div>
  );
}
export default Navbar;
