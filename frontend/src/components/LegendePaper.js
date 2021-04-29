import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Divider} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(70),
      height: theme.spacing(25),
      
    },
  },
}));

export default function SimplePaper() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3} ><p>BF=bussinesfit </p><p>IF=Information Quality</p><p>TQ=Technical Quality</p>  <p> CI=Cost Impact</p>  </Paper> 
    </div>
  );
}
