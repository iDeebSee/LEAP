import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, InteractiveList, Box } from '@material-ui/core';
import SimpleDialog from '../components/PopUp';
import clsx from 'clsx';
import Copyright from '../components/Copyright';
import SimpleTable from '../components/Table';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },



    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',

    },
    fixedHeight: {
        height: 'auto',
    },
}));



export default function Applications() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <div clasName={classes.root}>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>

                            <Paper className={fixedHeightPaper}>
                                <SimpleDialog title="Add a user" body="" name="user" message="user has been added!"></SimpleDialog>
                                <SimpleTable></SimpleTable>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}