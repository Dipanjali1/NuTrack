import React, { useState, useEffect } from 'react';
import '../styles/App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nutrition from './Nutrition';
import Navbar from './Navbar.js';
import BMRestimate from './BMRestimate.js';
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';

const USERS = 'http://localhost:3001/api/v1/profile';

const App = () => {

  const [ user, setUserData ] = useState('');

  useEffect(() => {
      getUserInfo();
  }, [])

  function handleSignIn(user){
    localStorage.setItem('user', user.jwt);
  }

  function handleLogout(){
    localStorage.removeItem('user');
  }

  async function getUserInfo(){
    if(localStorage.getItem('user')){
      const reqObj = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      }
      await fetch(USERS, reqObj)
            .then(res => res.json())
            .then(data => setUserData(data))
    }
  }

  return (
    <div className="App">
      <Router>
        <Navbar handleLogout={handleLogout} />
        <Switch>
            <Route exact path="/" render={(routeProps) => {return <Nutrition {...routeProps} user={user} getUserInfo={getUserInfo} />}} />
            <Route exact path="/BMRestimate" render={(routeProps) => {return <BMRestimate {...routeProps} user={user} getUserInfo={getUserInfo} />}} />
            <Route exact path="/signup" render={(routeProps) => {return <SignUp {...routeProps} />}} />
            <Route exact path="/signin" render={(routeProps) => {return <SignIn {...routeProps} handleSignIn={handleSignIn} />}} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
