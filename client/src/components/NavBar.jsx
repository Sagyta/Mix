import { Link } from "react-router-dom";
import '../css/NavBar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navList">
        <li className="navItem">
          <Link to="/" className="link">Home</Link>
        </li>
        <li className="navItem">
          <Link to="/seccionNews" className="link">Noticias</Link>
        </li>
        <li className="navItem">
          <Link to="/contacto" className="link">Contacto</Link>
        </li>
      </ul>
    </nav>
  );
}