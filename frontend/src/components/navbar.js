import "../styles/navbar.css";
import logo from "../assets/whisbot-logo.png";

export default function Navbar() {
  console.log(window.innerHeight);
  console.log(window.innerWidth);
  return (
    <div className="navbar" id="navbar">
      <div className="logo">
        <img src={logo} />
        <p className="web-name">WhisBot</p>
      </div>
    </div>
  );
}
