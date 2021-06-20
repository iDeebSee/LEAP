import { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { WorkListItems, secondaryListItems, adminListItems, startWorkListItems } from './components/AsideItems';
import Copyright from './components/Copyright'

import {
    CssBaseline,
    Drawer,
    Box,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Container,
    Grid,
} from '@material-ui/core';
import Routes, { UserRoutes } from './components/Routes';
import {
    BrowserRouter as Router
} from "react-router-dom";
import AuthService from './services/Auth.service';
import { ProtectedAdmin } from './services/ProtectRoute';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    centered: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '10rem'
    }
}));

export default function App() {
    const classes = useStyles();
    const [envId, setEnvId] = useState('');
    const [open, setOpen] = useState(true);
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const displayAdminPage = () => {
        let output;

        if (AuthService.isAdmin()) {
            ProtectedAdmin.authenticate();
            output = (
                <div>
                    <Divider />
                    <List>
                        {adminListItems}
                    </List>
                </div>
            );
        } else {
            ProtectedAdmin.LogOut();
        }
        return output;

    }

    //make new router just for environment 
    //load that router when no env is assigned

    if(AuthService.getCurrentUser() !== null) {
        return (
            <Router baseName='/Leap'>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                        <Toolbar className={classes.toolbar} >
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                                Dashboard
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                        }}
                        open={open}
                    >
                        <div className={classes.toolbarIcon}>
                            <IconButton onClick={handleDrawerClose}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        {displayAdminPage()}
                        <Divider />
                        <List>{startWorkListItems}</List>
                        <Divider />
                        <List>{WorkListItems(envId)}</List>
                        <Divider />
                        <List>{secondaryListItems}</List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Container maxWidth="xl" className={classes.container}>
                            <Grid container spacing={3}>
                                <Routes setEnvId={setEnvId}/>
                            </Grid>
                        </Container>
                    </main>
                </div>
                <Box pt={4}>
                    <Copyright />
                </Box>
            </Router>
        );
    } else {
        return (
            <Router>
                <Container className={clsx(classes.container && classes.centered)}>
                    <CssBaseline />
                    <div>
                        <UserRoutes />
                        <Box pt={4}>
                            <Copyright />
                        </Box>
                    </div>
                </Container>
            </Router>
        );
    }

}