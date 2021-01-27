import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import API from '../services/Api.js';
import Nutrition from '../pages/Nutrition';
import Navbar from './Navbar.js';
import BMRestimate from '../pages/BMRestimate.js';
import SignUp from '../pages/SignUp.js';
import SignIn from '../pages/SignIn.js';
import Main from '../pages/Main.js';
import Account from '../pages/Account.js';
import Verification from '../pages/Verification';
import Overview from '../pages/Overview.js';
import NuReportDisplay from '../pages/NuReportDisplay.js';
import '../style/App.scss';

const App = () => {
  const [ user, setUserData ] = useState();
  const [ verified, setVerified ] = useState(false);
  const [ updateClicked, setUpdateClicked ] = useState(false);
  const [ deleteClicked, setDeleteClicked ] = useState(false);
  const [ loading, setLoading ] = useState(false);

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
      setLoading(true);
      API.getUserInfo(localStorage.getItem('user'))
      .catch(err => err)
            .then(data => {
              setUserData(data);
              setLoading(false);
            })
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
            <Route exact path="/" render={(routeProps) => {return <Main {...routeProps} loading={loading} setLoading={setLoading} user={user} getUserInfo={getUserInfo} />}} />
            <Route exact path="/intakeestimate" render={(routeProps) => {return <Nutrition {...routeProps} loading={loading} setLoading={setLoading} user={user} getUserInfo={getUserInfo} />}} />
            <Route exact path="/overview" render={(routeProps) => {return <Overview {...routeProps} loading={loading} setLoading={setLoading} user={user} getUserInfo={getUserInfo} />}} />
            <Route exact path="/overview/nutrition_reports/:id" render={(routeProps) => {return <NuReportDisplay {...routeProps} loading={loading} setLoading={setLoading} user={user} getUserInfo={getUserInfo} />}} />
            <Route exact path="/BMRestimate" render={(routeProps) => {return <BMRestimate {...routeProps} loading={loading} setLoading={setLoading} user={user} getUserInfo={getUserInfo} />}} />
            <Route exact path="/signup" render={(routeProps) => {return <SignUp {...routeProps} />}} loading={loading} setLoading={setLoading} />
            <Route exact path="/signin" render={(routeProps) => {return <SignIn {...routeProps} loading={loading} setLoading={setLoading} handleSignIn={handleSignIn} getUserInfo={getUserInfo} setVerified={setVerified} setUpdateClicked={setUpdateClicked} setDeleteClicked={setDeleteClicked} />}} />
            <Route exact path="/account" render={(routeProps) => {return <Account {...routeProps} loading={loading} setLoading={setLoading} user={user} getUserInfo={getUserInfo} verified={verified} setVerified={setVerified} handleVerification={handleVerification} updateClicked={updateClicked} setUpdateClicked={setUpdateClicked} deleteClicked={deleteClicked} setDeleteClicked={setDeleteClicked} />}} />
            <Route exact path="/verify" render={(routeProps) => {return <Verification {...routeProps} loading={loading} setLoading={setLoading} user={user} getUserInfo={getUserInfo} verified={verified} setVerified={setVerified} handleVerification={handleVerification} updateClicked={updateClicked} setUpdateClicked={setUpdateClicked} deleteClicked={deleteClicked} setDeleteClicked={setDeleteClicked} />}} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
