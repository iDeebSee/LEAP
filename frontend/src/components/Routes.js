import React from 'react';
import Index from "../templates/Index.js";
import Applications from "../templates/Applications.js";
import CapabilityDetailView from './CapabilityComponents/CapabilityDetailView';
import CapabilitiesView from './CapabilityComponents/CapabilitiesView'
import Admin from './AdminComponents/Admin';
import SignIn from '../templates/SignIn';
import ForgotPassword from '../templates/ForgotPassword';
import StrategyDetailView from './StrategyComponents/StrategyDetailView';
import StrategiesView from './StrategyComponents/StrategiesView';
import EnvironmentDetailView from '../components/EnvironmentDetailView'
import { ProtectedAdmin } from '../services/ProtectRoute';
import ApplicationEdit from '../components/applicationComponents/ApplicationEdit';

import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import ResetPassword from '../templates/ResetPassword.js';
import CreatePassword from '../templates/CreatePassword.js';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/home" component={Index}/>
            <Route exact path="/capabilities" component={CapabilitiesView}/>
            <Route exact path="/capabilities/:id" component={CapabilityDetailView}/>
            <Route exact path="/Environment/:id" component={EnvironmentDetailView}/>
            <Route exact path="/applications/:id" component={ApplicationEdit}/>
            <Route exact path="/applications" component={Applications}/>
            <Route exact path="/strategy" component={StrategiesView}/>
            <Route exact path="/strategy/:id" component={StrategyDetailView}/>
            <AdminRoute path="/admin" component={Admin}/>
            <Route path="*" render={() => <Redirect to={{pathname: "/home"}}/>}/>
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
            <Route exact path="/sign_in" component={SignIn}/>
            <Route exact path="/request_reset" component={ForgotPassword}/>
            <Route exact path="/reset_password/:token" component={ResetPassword}/>
            <Route exact path="/create_password/:token" component={CreatePassword}/>
            <Route path="*" render={() => <Redirect to={{pathname: "/sign_in"}}/>}/>
            <Route render={() => <Redirect to={{pathname: "/sign_in"}} />} />
        </Switch>
    );
}
