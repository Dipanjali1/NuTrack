import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nutrition from './Nutrition';

const App = () => {

  return (
    <div className="App">
      <Router>
        <Switch>
            <Route path="/" render={(routeProps) => {return <Nutrition {...routeProps} />}} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
