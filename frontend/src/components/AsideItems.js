import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LayersIcon from '@material-ui/icons/Layers';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TimelineIcon from '@material-ui/icons/Timeline';
import {Link} from 'react-router-dom';

export const mainListItems = (
    <div>
        <ListItem button component={Link} to="/home">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/capabilities"> 
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Capabilities" />
        </ListItem>
        <ListItem button component={Link} to="/strategy">
            <ListItemIcon>
                <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Strategy"/>
        </ListItem>
        <ListItem button component={Link} to="/applications"> 
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Applications" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        {/* <ListSubheader inset>Saved reports</ListSubheader> */}
        <ListItem button>
        <Link to="/SignIn">
            <ListItemIcon>
                <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
        </Link>
        </ListItem>
    </div>
);