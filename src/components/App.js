import React from 'react';
import '../styles/App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nutrition from './Nutrition';
import Navbar from './Navbar.js';
import BMR from './BMR.js';

const App = () => {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
            <Route exact path="/" render={(routeProps) => {return <Nutrition {...routeProps} />}} />
            <Route exact path="/BMR" render={(routeProps) => {return <BMR {...routeProps} />}} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
