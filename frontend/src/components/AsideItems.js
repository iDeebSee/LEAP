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

export const mainListItems = (
    <div>
        <ListItem button component={Link} to="/home">
            <ListItemIcon>
                <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/capabilities">
            <ListItemIcon>
                <Layers />
            </ListItemIcon>
            <ListItemText primary="Capabilities" />
        </ListItem>
        <ListItem button component={Link} to="/strategy">
            <ListItemIcon>
                <Timeline />
            </ListItemIcon>
            <ListItemText primary="Strategy" />
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