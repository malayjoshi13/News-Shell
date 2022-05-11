
import "./Navbar.css";

function Navbar() {
    
  return (
    <div className="Nav">
      <div className="menu"></div>
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
