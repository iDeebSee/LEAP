import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {

    },
}));

export default function Index() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            index
        </div>
    );
}