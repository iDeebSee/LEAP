import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
      
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemText primary="capability 1" />
        </ListItem>
        <ListItemLink href="#simple-list">
          <ListItemText primary="capâbility 2" />
        </ListItemLink>
      </List>
    </div>
  );
}