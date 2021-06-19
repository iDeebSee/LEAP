import React, { useState,useEffect, useCallback } from 'react';
import { 
    Container, 
    DialogContent, 
    TextField,  
    DialogActions, 
    ButtonGroup, 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContentText, 
    List,
    ListItemText,
    ListItem,
    ListSubheader,
    FormControl,
    Grid, 
    Paper,
    InputLabel,
    Select,
    Input,
    Checkbox,
    MenuItem
} from "@material-ui/core";
import strategyItemService from "../../services/StrategyItem.service";
import CapabilityService from '../../services/Capability.service';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
const useStyles = (makeStyles((theme)  => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
        overflow: "scroll"
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: "42rem",
    },
    dialog: {
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(2),
            width: '100%'
        }
    },
    listSubHeader: {
        backgroundColor: "lightgrey",
        margin: 0,
        width: "100%"
    }
})));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function StrategyDetailView (props) {
    const classes = useStyles();
    const[strategyItems,setStrategyItems]=useState([]);
    const[openEdit,setOpenEdit]=useState(false);
    const[openDelete,setOpenDelete]=useState(false);
    const[strategyItemId, setStrategyItemId]=useState("");
    const[newStrategyItemName, setNewStrategyItemName]=useState("");
    const [capabilities, setCapabilities] = useState([]);
    const [chosenCapabilities, setChosenCapabilities] = useState([]);
    const[open,setOpen]=useState(false);
    const[dialogtext,setdialogtext]=useState("");
    const { envId, id } = useParams();

    function createStrategyItem() {
        let text = "";
        if(newStrategyItemName) {
            strategyItemService.create(newStrategyItemName, id, chosenCapabilities)
                .then(res => {
                    console.log(res);
                    getStrategyItems();
                })
                .catch(e => {
                    console.log(e);
                })
        } else {
            text = "Please make sure all required fields are filled in";
        }
        
        setOpen(false);
        setdialogtext(text);
    }


    const editStrategyItem = () => {
        strategyItemService.update(strategyItemId, newStrategyItemName, id, chosenCapabilities)
        .then(res => {
            console.log(res.data);
            getStrategyItems();
            setOpenEdit(false);
        })
        .catch(e => {
            console.log(e);
        });
    };


    const getStrategyItems = useCallback(() => {
        strategyItemService.getAll(id)
            .then(res => {
                console.log(res.data.message);
                console.table(res.data.data)
                setStrategyItems(res.data.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, [id])

    const getCapabilities = useCallback(() => {
        CapabilityService.getLinked(envId)
            .then(res => {
                console.log(res.data.message)
                console.table(res.data.data)
                setCapabilities(res.data.data)
            })
    }, [envId, setCapabilities]);

    useEffect(()=>{
        getStrategyItems();
        getCapabilities();
    },[getStrategyItems, getCapabilities])

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const openDeleteDialog = (id) => {
        setOpenDelete(true);
        setStrategyItemId(id); 
    }

    const closeDeleteDialog = () => {
        setOpenDelete(false)
    }

    function deleteStrategyItem() {
        strategyItemService.delete(strategyItemId)
        .then(res => {
            console.log(res)
            getStrategyItems()
        })
        .catch(e => {
            console.error(e);
        })
        setOpenDelete(false);
    }

    const deleteDialog = (
        <Dialog open={openDelete} onClose={() => {closeDeleteDialog()}} className={classes.dialog}>
            <DialogTitle>Are you sure you want to delete this strategy?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This action cannot be reversed! 
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ButtonGroup>
                    <Button variant="text" color="primary" onClick={() => {deleteStrategyItem()}}>Delete</Button>
                    <Button variant="text" color="primary" onClick={() => {closeDeleteDialog()}}>Cancel</Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
    );

    const openEditDialog = (strategyItem) => {
        setStrategyItemId(strategyItem.id);
        setNewStrategyItemName(strategyItem.name);
        setChosenCapabilities(strategyItem.linkedCapabilities);
        setOpenEdit(true);
    };

    const closeEditDialog = () => {
        setOpenEdit(false);
        getCapabilities();
        setChosenCapabilities([]);
    }

    const handleEditChange = (capabilities) => {

        //make array of unique objects from input
        let output = _.uniqWith(capabilities, _.isEqual)

        //go through all the CURRENT capabilities IN THE OBJECT WE'RE EDITING
        chosenCapabilities.forEach(cap => {
            //left of and (&&): see if the current capability exists in the unique input
            //right of and (&&): see if the non unique input contains the current capability more than once
            //this results in any duplicates in the input being removed, unlinking the capability that was already in the strategy item
            if(_.find(output, cap) !== undefined && capabilities.filter(x => _.isEqual(x, cap)).length > 1) {
                _.remove(output, cap)
            }
        });

        setChosenCapabilities(output)
    }
    
    const editDialog = (
        <Dialog open={openEdit} onClose={() => {closeEditDialog()}} className={classes.dialog}>
            <DialogTitle>Edit strategy item</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} direction="column">
                    <Grid item>
                        <TextField
                            label="Name"
                            type="text"
                            variant="filled"
                            color="primary"
                            defaultValue={newStrategyItemName}
                            onChange={(e) => setNewStrategyItemName(e.target.value)}
                        />
                    </Grid>
                    <Grid item className={classes.formControl}>
                        <FormControl>
                            <InputLabel id="multiple-select-checkbox-label">Capabilities</InputLabel>
                            <Select
                                labelId="multiple-select-checkbox-label"
                                id="multiple-select-checkbox"
                                multiple
                                value={chosenCapabilities}
                                onChange={(e) => {handleEditChange(e.target.value)}}
                                input={<Input/>}
                                renderValue={selected => joinSelectedItemNames(selected)}
                                MenuProps={MenuProps}
                            >
                                {capabilities.map((capability) => {
                                return(
                                    <MenuItem key={nanoid()} value={capability}>
                                        <Checkbox checked={chosenCapabilities.map(function(cap) {return cap.id}).indexOf(capability.id) > -1}/>
                                        <ListItemText primary={capability.name}/>
                                    </MenuItem>
                                )})}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <ButtonGroup>
                    <Button variant="text" color="primary" onClick={() => {editStrategyItem()}}>Edit</Button>
                    <Button variant="text" color="primary" onClick={() => {closeEditDialog()}}>Cancel</Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
    );
    
    //joins all names of the linked capabilities for display in the select
    const joinSelectedItemNames = (selected) => {
        let output = []
        selected.forEach(item => {
            output.push(item.name);
        })

        return output.join(', ');
    }

    return(
        <Container>
            <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                <List>
                    <ListSubheader className={classes.listSubHeader}>strategyItem list</ListSubheader>
                    {strategyItems.map(strat => {
                        return (
                            <ListItem key={nanoid()}>
                                <ListItemText>{strat.name}</ListItemText>
                                <ButtonGroup>
                                    <Button onClick={() => {openEditDialog(strat)}}>Edit</Button>
                                    <Button onClick={() => {openDeleteDialog(strat.id)}}>Delete</Button>
                                </ButtonGroup>
                            </ListItem>
                            );
                        })}
                </List>
                {editDialog}
                {deleteDialog}
            </Paper>
            <ButtonGroup className={classes.buttonGroup}>
                <Button variant="contained" color="primary" onClick={handleOpen}>Add StrategyItem</Button>
            </ButtonGroup>
            <Dialog onClose={handleClose} open={open} className={classes.dialog}>
                <DialogTitle>Create new Strategy Item</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} direction="column">
                        <Grid item>
                            <DialogContentText>{dialogtext}</DialogContentText>
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Name"
                                type="text"
                                variant="filled"
                                color="primary"
                                required
                                onChange={e => setNewStrategyItemName(e.target.value)}
                            />
                        </Grid>
                        <Grid item className={classes.formControl}>
                            <FormControl>
                                <InputLabel id="multiple-select-checkbox-label">Capabilities</InputLabel>
                                <Select
                                    labelId="multiple-select-checkbox-label"
                                    id="multiple-select-checkbox"
                                    multiple
                                    value={chosenCapabilities}
                                    onChange={(e) => {setChosenCapabilities(e.target.value)}}
                                    input={<Input/>}
                                    renderValue={selected => joinSelectedItemNames(selected)}
                                    MenuProps={MenuProps}
                                >
                                    {capabilities.map((capability) => {
                                    return(
                                        <MenuItem key={nanoid()} value={capability}>
                                            <Checkbox checked={chosenCapabilities.map(function(cap) {return cap.id}).indexOf(capability.id) > -1}/>
                                            <ListItemText primary={capability.name}/>
                                        </MenuItem>
                                    )})}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <ButtonGroup>
                        <Button variant="text" color="primary" onClick={() => {createStrategyItem()}}>Create</Button>
                        <Button variant="text" color="primary" onClick={handleClose}>Cancel</Button>
                    </ButtonGroup>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default StrategyDetailView;