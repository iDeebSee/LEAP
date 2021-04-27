import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TimelineIcon from '@material-ui/icons/Timeline';
import {Link} from 'react-router-dom';

export const mainListItems = (
    <div>
        <ListItem button>
            <Link to="/" style={{'text-decorations': 'none'}}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </Link>
        </ListItem>
        <ListItem button>
            <Link to="/strategy">
                <ListItemIcon>
                    <TimelineIcon />
                </ListItemIcon>
                <ListItemText primary="Strategy" path="strategy"/>
            </Link>
        </ListItem>
        <ListItem button>
            <Link to="/applications">
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Applications" />
            </Link>
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        {/* <ListSubheader inset>Saved reports</ListSubheader> */}
        <ListItem button>
            <ListItemIcon>
                <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
        </ListItem>
    </div>
);