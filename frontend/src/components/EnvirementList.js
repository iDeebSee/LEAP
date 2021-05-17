import { 
    Button, 
    ButtonGroup, 
    Dialog, 
    ListItem, 
    ListItemText,
    Paper,
    List,
    ListSubheader, 
    makeStyles,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    MenuItem
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from 'react-router-dom'
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import EnvironmentService from "../services/EnvironmentService";

const useStyles = (makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    dialog: {
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(2),
            width: '100%'
        }
    },
})));

const EnvirementList = (props) => {
    const classes = useStyles(),
    Environments = props.data,
    [open, setOpen] = useState(false),
    [newName, setNewName] = useState(''),
    [newDesc, setNewDesc] = useState(''),
    [id, setId] = useState('');

    const editEnvironment = () => {
        let data = {"name": newName, "description": newDesc};
       
        
        EnvironmentService.update(id, data)
        .then(res => {
            console.log(res.data);
            props.getenvironments();
            setOpen(false);
        })
        .catch(e => {
            console.log(e);
        });
    }
    
    return(
        <Paper className={clsx(classes.paper, classes.fixedHeight)}>
            <List>
                <ListSubheader>Envirement list</ListSubheader>
                {Environments.map(env => {
                    return (
                        <ListItem key={nanoid()}>
                            <ListItemText>{env.name}</ListItemText>
                            <ButtonGroup>
                                <Button component={Link} to={`/capabilities/${env.id}`}>View</Button>
                                <Button onClick={() => {setOpen(true); setId(env.id)}}>Edit</Button>
                                <Button onClick={() => props.onCardDelete(env.id)}>Delete</Button>
                            </ButtonGroup>
                        </ListItem>
                    );
                })}
            </List>
            <Dialog open={open} onClose={() => setOpen(false)} className={classes.dialog}>
                <DialogTitle>Edit Envirement</DialogTitle>
                <DialogContent>
                    <DialogContentText>Blank fields will retain their previous value</DialogContentText>
                    <TextField
                            label="Name"
                            type="text"
                            variant="filled"
                            color="primary"
                            onChange={e => setNewName(e.target.value)}
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            type="text"
                            variant="filled"
                            color="primary"
                            multiline
                            rowsMax={6}
                            rows={6}
                            onChange={e => setNewDesc(e.target.value)}
                        />
                        
                        
                </DialogContent>
                <DialogActions>
                    <ButtonGroup>
                        <Button variant="text" color="primary" onClick={() => {editEnvironment()}}>Edit</Button>
                        <Button variant="text" color="primary" onClick={() => setOpen(false)}>Cancel</Button>
                    </ButtonGroup>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default EnvirementList;