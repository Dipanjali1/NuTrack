import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import API from '../services/Api.js';
import Nutrition from './Nutrition';
import Navbar from './Navbar.js';
import BMRestimate from './BMRestimate.js';
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import Main from './Main.js';
import Account from './Account.js';
import Verification from './Verification';
import '../styles/App.scss';

const App = () => {

  const [ user, setUserData ] = useState('');
  const [ verified, setVerified ] = useState(false);
  const [ updateClicked, setUpdateClicked ] = useState(false);
  const [ deleteClicked, setDeleteClicked ] = useState(false);

  useEffect(() => {
      getUserInfo();
  }, [])

  function handleSignIn(user){
    localStorage.setItem('user', user.jwt);
  }

  function handleLogout(){
    localStorage.removeItem('user');
  }

  function getUserInfo(){
    if(localStorage.getItem('user')){
      API.getUserInfo(localStorage.getItem('user'))
            .then(data => setUserData(data))
    }
  }

  function handleVerification(history, e){
    setDeleteClicked(false);
    setUpdateClicked(false);
    if(!verified){
      if(!e.target.classList.contains("delete")){
        setUpdateClicked(true);
      } else {
        setDeleteClicked(true);
      }
      history.push('/verify');
    } else {
      setVerified(false);
    }
  }

  return (
    <div className="App">
      <Router>
        <Navbar handleLogout={handleLogout} />
        <Switch>
            <Route exact path="/" render={(routeProps) => {return <Main {...routeProps} user={user} getUserInfo={getUserInfo} />}} />
            <Route exact path="/intakeestimate" render={(routeProps) => {return <Nutrition {...routeProps} user={user} getUserInfo={getUserInfo} />}} />
            <Route exact path="/BMRestimate" render={(routeProps) => {return <BMRestimate {...routeProps} user={user} getUserInfo={getUserInfo} />}} />
            <Route exact path="/signup" render={(routeProps) => {return <SignUp {...routeProps} />}} />
            <Route exact path="/signin" render={(routeProps) => {return <SignIn {...routeProps} handleSignIn={handleSignIn} getUserInfo={getUserInfo} setVerified={setVerified} setUpdateClicked={setUpdateClicked} setDeleteClicked={setDeleteClicked} />}} />
            <Route exact path="/account" render={(routeProps) => {return <Account {...routeProps} user={user} getUserInfo={getUserInfo} verified={verified} setVerified={setVerified} handleVerification={handleVerification} updateClicked={updateClicked} setUpdateClicked={setUpdateClicked} deleteClicked={deleteClicked} setDeleteClicked={setDeleteClicked} />}} />
            <Route exact path="/verify" render={(routeProps) => {return <Verification {...routeProps} user={user} getUserInfo={getUserInfo} verified={verified} setVerified={setVerified} handleVerification={handleVerification} updateClicked={updateClicked} setUpdateClicked={setUpdateClicked} deleteClicked={deleteClicked} setDeleteClicked={setDeleteClicked} />}} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
