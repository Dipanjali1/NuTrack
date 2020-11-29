import React from 'react';
import '../styles/Navbar.scss';
import { Link, withRouter } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <div className="navbarCont">
        <div className="pageTitle">NuTrack</div>
        <nav role="navigation">
            <div id="menuToggle">
                <input className="checkBox" type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
                  {
                    localStorage.getItem('user') ?
                    <ul id="menu">
                      <Link to="/"><li>Home</li></Link>
                      <Link to="/intakeestimate"><li>Intake Estimate</li></Link>
                      <Link to="/BMRestimate"><li>BMR Estimate</li></Link>
                      <Link to="/signin" className="logout-btn" onClick={(e) => {props.handleLogout(e)}}><li>Log out</li></Link>
                    </ul>
                    :
                    <ul id="menu">
                      <Link to="/"><li>Home</li></Link>
                      <Link to="/signup"><li>Sign-Up</li></Link>
                      <Link to="/signin"><li>Sign-In</li></Link>
                      <Link to="/intakeestimate"><li>Intake Estimate</li></Link>
                      <Link to="/BMRestimate"><li>BMR Estimate</li></Link>
                    </ul>
                  }
            </div>
        </nav>
    </div>
  );
}
export default withRouter(Navbar);
