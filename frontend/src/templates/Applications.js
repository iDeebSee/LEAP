import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {

    },
}));

export default function Applications() {
    const classes = useStyles();

    return (
        <div clasName={classes.root}>
            applications
        </div>
    );
}