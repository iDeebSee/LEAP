import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper,  Box } from '@material-ui/core';
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
    legendaWrapper: {
        width: 'auto',
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    legenda: {
        width: '25px',
        height: '25px',
        display: 'inline-block',
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
                            <Paper style={{ flexDirection: 'row', justifyContent: 'space-evenly', }} className={fixedHeightPaper}>
                                <div className={classes.legendaWrapper}>
                                    <div style={{ backgroundColor: 'red' }} className={classes.legenda}></div>
                                    <p> = Business Fit</p>
                                </div>
                                <div className={classes.legendaWrapper}>
                                    <div style={{ backgroundColor: 'orange' }} className={classes.legenda}></div>
                                    <p> = Information Quality</p>
                                </div>
                                <div className={classes.legendaWrapper}>
                                    <div style={{ backgroundColor: 'blue' }} className={classes.legenda}></div>
                                    <p> = Technical Quality</p>
                                </div>
                                <div className={classes.legendaWrapper}>
                                    <div style={{ backgroundColor: 'green' }} className={classes.legenda}></div>
                                    <p> = Cost Impact</p>
                                </div>
                            </Paper>
                            <br></br>
                            <Paper className={fixedHeightPaper}>
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