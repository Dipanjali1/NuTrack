import React from 'react';
import '../style/Navbar.scss';
import { Link, withRouter } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <div className="navbarCont">
        <Link to="/" className="link-title"><div className="pageTitle">NuTrack</div></Link>
        <nav role="navigation">
            <div id="menuToggle">
                  <label htmlFor="ckbx" className="cb-hidden">CheckBox</label>
                  <input id="ckbx" className="checkBox" type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
                  {
                    localStorage.getItem('user') ?
                    <div id="menu">
                      <Link to="/"><div>Home</div></Link>
                      <Link to="/account"><div>Manage Account</div></Link>
                      <Link to="/overview"><div>Overview</div></Link>
                      <Link to="/intakeestimate"><div>Intake Estimate</div></Link>
                      <Link to="/BMRestimate"><div>BMR Estimate</div></Link>
                      <Link to="/signin" className="logout-btn" onClick={(e) => {props.handleLogout(e)}}><div>Log out</div></Link>
                    </div>
                    :
                    <div id="menu">
                      <Link to="/"><div>Home</div></Link>
                      <Link to="/signup"><div>Sign-Up</div></Link>
                      <Link to="/signin"><div>Sign-In</div></Link>
                      <Link to="/intakeestimate"><div>Intake Estimate</div></Link>
                      <Link to="/BMRestimate"><div>BMR Estimate</div></Link>
                    </div>
                  }
            </div>
        </nav>
    </div>
  );
}
export default withRouter(Navbar);
