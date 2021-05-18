import React from 'react';
import Index from "../templates/Index.js";
import Applications from "../templates/Applications.js";
import CapabilityDetailView from './CapabilityComponents/CapabilityDetailView';
import CapabilitiesView from './CapabilityComponents/CapabilitiesView'
import User from '../templates/User';
import Admin from '../templates/Admin';
import SignUp from '../templates/SignUp';
import SignIn from '../templates/SignIn';
import TwoFactorAuthentication from '../templates/TwoFactorAuthentication';
import ForgotPassword from '../templates/ForgotPassword';
import StrategyDetailView from './StrategyComponents/StrategyDetailView';
import StrategiesView from './StrategyComponents/StrategiesView';

import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/home" component={Index}/>
            <Route exact path="/capabilities" component={CapabilitiesView}/>
            <Route exact path="/capabilities/:id" component={CapabilityDetailView}/>
            <Route exact path="/applications" component={Applications}/>
            <Route exact path="/strategy" component={StrategiesView}/>
            <Route exact path="/strategy/:id" component={StrategyDetailView}/>
            <Route exact path="/profile" component={User}/>
            <Route exact path="/admin" component={Admin}/>
            <Route exact path="/signIn" component={SignIn}/>
            <Route exact path="/signUp" component={SignUp}/>
            <Route exact path="/2FA" component={TwoFactorAuthentication}/>
            <Route exact path="/password" component={ForgotPassword}/>
            <Route exact path="/" render={() => <Redirect to={{pathname: "/home"}}/>}/>
            <Route render={() => <Redirect to={{pathname: "/home"}} />} />
        </Switch>
    );
}
