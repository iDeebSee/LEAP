import './App.css';
import React from 'react';
import Index from "./templates/Index.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
