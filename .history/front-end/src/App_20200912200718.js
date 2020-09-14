import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UpdateDetails from './routes/UpdateDetails';
import Details from './routes/Details';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home}/>
        <Route exact path="/update/:id" component={UpdateDetails}/>
        <Route exact path="/details" component={Details}/>
      </Router>
    </div>
  );
}

export default App;
