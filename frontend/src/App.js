import './App.css';
import React from 'react';
import Index from "./templates/Index.js";
import Applications from "./templates/Applications.js";
import Strategy from "./templates/Strategy";
import SignIn from "./templates/SignIn"
import SignUp from "./templates/SignUp"
import TwoFactorAuthentication from "./templates/TwoFactorAuthentication"

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route path="/applications">
          <Applications />
        </Route>
        <Route path="/strategy">
          <Strategy />
        </Route>
        <Route path="/signIn">
          <SignIn />
        </Route>
        <Route path="/signUp">
          <SignUp />
        </Route>
        <Route path="/2FA">
          <TwoFactorAuthentication />
        </Route>
        <Route component={Index} />
      </Switch>
    </Router>
  );
}

export default App;
