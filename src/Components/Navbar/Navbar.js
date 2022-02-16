
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const [click, setClick] = useState(false);

  
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
 
  return (
    <nav className="navbar-items fixed-top">
      <h1 className="navbar-logo">
      <i className="fas fa-book"></i>Admin-Citas
      </h1>

      <div className="menu-icon" onClick={handleClick}>
        <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
      </div>

      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li>
          <Link to="/" className="nav-links" onClick={closeMobileMenu}>
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/pacientes"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            Citas
          </Link>
        </li>

        <li>
          <Link
            to="/clientes"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            Clientes
          </Link>
        </li>

        <li>
          <Link
            to="/medicamentos"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            Medicamentos
          </Link>
        </li>

      </ul>
    </nav>
  );
  //}
}

export default Navbar;
