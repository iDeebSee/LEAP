import './App.css';
import React from 'react';
import Index from "./templates/Index.js";
import Applications from "./templates/Applications.js";
import Strategy from "./templates/Strategy";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <Router basename="/Leap">
      <Switch>
        <Route exact path="/" render={() => <Redirect to={{pathname: "/home"}}/>}/>
        <Route exact path="/home" component={Index}/>
        <Route exact path="/applications" component={Applications}/>
        <Route exact path="/strategy" component={Strategy}/>
        <Route render={() => <Redirect to={{pathname: "/home"}} />} />
      </Switch>
    </Router>
  );
}

export default App;
