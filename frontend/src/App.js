import './App.css';
import React from 'react';
import Index from "./templates/Index.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CapabilitiesListView from './components/CapabilityComponents/CapabilitiesListView';

function App() {
  return (
    <div>
      <Router>
        <nav>
          <Link to={"/list"}>List</Link>
        </nav>
        <main>
            <Switch>
              <Route path="/">
              <Route exact path={"/list"} component={CapabilitiesListView}/>
                <Index />
              </Route>
            </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
