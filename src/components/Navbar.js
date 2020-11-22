import React from 'react';
import '../styles/Navbar.scss';
import { Link, withRouter } from 'react-router-dom';

const Navbar = () => {

  return (
    <div className="navbarCont">
        <div className="pageTitle">NuTrack</div>
        <nav role="navigation">
            <div id="menuToggle">
                <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
                <ul id="menu">
                <Link to="/"><li>Home</li></Link>
                <Link to="/BMR"><li>BMR Calc</li></Link>
                </ul>
            </div>
        </nav>
    </div>
  );
}
export default withRouter(Navbar);
