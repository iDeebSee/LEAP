import React from 'react';
import Index from "../templates/Index.js";
import Applications from "../templates/Applications.js";
import CapabilityDetailView from './CapabilityComponents/CapabilityDetailView';
import CapabilitiesView from './CapabilityComponents/CapabilitiesView'
import Admin from './AdminComponents/Admin';
import SignUp from '../templates/SignUp';
import SignIn from '../templates/SignIn';
import ForgotPassword from '../templates/ForgotPassword';
import StrategyDetailView from './StrategyComponents/StrategyDetailView';
import StrategiesView from './StrategyComponents/StrategiesView';
import EnvironmentDetailView from '../components/EnvironmentDetailView'
import { ProtectedAdmin } from '../services/ProtectRoute';

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
            <Route exact path="/Environment/:id" component={EnvironmentDetailView}/>
            <Route exact path="/applications" component={Applications}/>
            <Route exact path="/strategy" component={StrategiesView}/>
            <Route exact path="/strategy/:id" component={StrategyDetailView}/>
            <AdminRoute path="/admin" component={Admin}/>
            <Route exact path="*" render={() => <Redirect to={{pathname: "/home"}}/>}/>
            <Route render={() => <Redirect to={{pathname: "/home"}} />} />
        </Switch>
    );
}

const AdminRoute = ({component: Component, ...rest}) => {
    return(
        <Route {...rest} render={props => {return (
                    ProtectedAdmin.getAuth() ? 
                    <Component {...props}/> : <Redirect to={{pathname: "/home"}}/>
                )}
            }
        />
    );
}

export function UserRoutes() {
    return(
        <Switch>
            <Route exact path="/signIn" component={SignIn}/>
            <Route exact path="/signUp" component={SignUp}/>
            <Route exact path="/password" component={ForgotPassword}/>
            <Route path="*" render={() => <Redirect to={{pathname: "/signIn"}}/>}/>
            <Route render={() => <Redirect to={{pathname: "/signIn"}} />} />
        </Switch>
    );
}
