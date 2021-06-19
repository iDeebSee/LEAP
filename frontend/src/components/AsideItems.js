import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/Auth.service';
import {
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import {
    Dashboard,
    Layers,
    ExitToApp,
    Timeline,
    Assessment,
    SupervisorAccount,
} from '@material-ui/icons';
import SettingsIcon from '@material-ui/icons/Settings';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
export const adminListItems = (
    <div>
        <ListItem button component={Link} to="/admin">
            <ListItemIcon>
                <SupervisorAccount />
            </ListItemIcon>
            <ListItemText primary="User list" />
        </ListItem>
    </div>
)

export const startWorkListItems = (
    <div>
        <ListItem button component={Link} to="/home">
            <ListItemIcon>
                <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
    </div>
);

export const WorkListItems = (envId) => (
    <div>
        <ListItem button component={Link} to={`/capabilities/${envId}`}>
            <ListItemIcon>
                <Layers />
            </ListItemIcon>
            <ListItemText primary="Capabilities" />
        </ListItem>
        <ListItem button component={Link} to={`/strategies/${envId}`}>
            <ListItemIcon>
                <Timeline />
            </ListItemIcon>
            <ListItemText primary="Strategies" />
        </ListItem>
        <ListItem button component={Link} to="/applications">
            <ListItemIcon>
                <Assessment />
            </ListItemIcon>
            <ListItemText primary="Applications" />
        </ListItem>
        <ListItem button component={Link} to="/resources">
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Resources" />
        </ListItem>
        <ListItem button component={Link} to="/bussinesproces">
            <ListItemIcon>
                <PermDataSettingIcon />
            </ListItemIcon>
            <ListItemText primary="Bussines Processes" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListItem button component={Link} to="/sign_in" onClick={() => { AuthService.logout(); }}>
            <ListItemIcon>
                <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Log out" />
        </ListItem>
    </div>
);