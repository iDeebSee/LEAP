import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {

    },
}));

export default function Strategy() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            strategy
        </div>
    );
}