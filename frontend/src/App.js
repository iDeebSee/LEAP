import './App.css';
import React from 'react';
import Index from "./templates/Index.js";
import Applications from "./templates/Applications.js";
import Strategy from "./templates/Strategy.js";
import SignIn from "./templates/SignIn.js"
import SignUp from "./templates/SignUp.js"
import TwoFactorAuthentication from "./templates/TwoFactorAuthentication.js"
import Password from "./templates/ForgotPassword.js"
import User from "./templates/User.js"

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
        <Route path="/password">
          <Password />
        </Route>
        <Route path="/profile">
          <User />
        </Route>
        <Route component={Index} />
      </Switch>
    </Router>
  );
}

export default App;
