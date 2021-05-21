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
import CapabilityService from "../services/Capability.service";

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
    capabilities = props.data,
    [open, setOpen] = useState(false),
    [newName, setNewName] = useState(''),
    [newDesc, setNewDesc] = useState(''),
    [newParent, setNewParent] = useState(null),
    [id, setId] = useState('');

    const editCapability = () => {
        let data = {"name": newName, "description": newDesc};
        if(newParent != null) {
            data.parentId = newParent.id;
        }
        CapabilityService.update(id, data)
        .then(res => {
            console.log(res.data);
            props.getCapabilities();
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
                {capabilities.map(cap => {
                    return (
                        <ListItem key={nanoid()}>
                            <ListItemText>{cap.name}</ListItemText>
                            <ButtonGroup>
                                <Button component={Link} to={`/capabilities/${cap.id}`}>View</Button>
                                <Button onClick={() => {setOpen(true); setId(cap.id)}}>Edit</Button>
                                <Button onClick={() => props.onCardDelete(cap.id)}>Delete</Button>
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
                        <TextField
                            label="Parent"
                            select
                            variant="filled"
                            color="primary"
                            defaultValue="None"
                            onChange={e => setNewParent((e.target.value === "None" ? null : e.target.value))}
                        >
                            <MenuItem value='None'>
                                None
                            </MenuItem>
                            {capabilities.map(cap => {
                                return(
                                    <MenuItem key={nanoid()} value={cap}>
                                        {cap.name}
                                    </MenuItem>
                                )
                            })}
                        </TextField>
                </DialogContent>
                <DialogActions>
                    <ButtonGroup>
                        <Button variant="text" color="primary" onClick={() => {editCapability()}}>Edit</Button>
                        <Button variant="text" color="primary" onClick={() => setOpen(false)}>Cancel</Button>
                    </ButtonGroup>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default EnvirementList;