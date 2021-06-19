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
    

} from "@material-ui/core";
import strategyItemService from "../../services/StrategyItemService";
import StrategyService from "../../services/Strategy.service";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom'

const styles =(makeStyles((theme)  => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        width: "100%",
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

function StrategyDetailView (props) {
   
    const[strategy,setSTrategy]=useState([]);
    const[newStratItem,setNewStratItem]=useState([]);
    const[newNameStratItem,setNewNameStratItem]=useState("");
    const[strategyItem,setStrategyItem]=useState([""]);
    const[openEdit,setOpenEdit]=useState(false);
    const[openDelete,setOpenDelete]=useState(false);
    const[ID,setID]=useState("");
    const[currentStratItem,setCurrentStratItem]=useState([]);
    const[newName,setNewName]=useState("");
    const[open,setOpen]=useState(false);
    const[dialogtext,setdialogtext]=useState("");
    

  /**
   * Geeft alle strategies terug.
   */
  function  getStrategy() {
        StrategyService.getAll()
            .then(res => {
                setSTrategy(res.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    /**
     * Veranderingen in een strategyItem worden gemaakt.
     */
    function changeStateStratItem(data)
    {
        console.log("data",data);
        setStrategyItem(data);
        createStratItem();
    }

    /**
     * Creatie van een nieuwe stragegyItem.
     */
   function createStratItem() {

        let text = "";
        if(strategyItem !== '' ) {
            let data = {"name": newNameStratItem};
            
            strategyItemService.create(data)
                .then(res => {
                    console.log(res);
                    setNewNameStratItem(res.data.name)
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

    /**
     * Wijzigt een stragegyItem en geeft de lijst met items opnieuw terug.
     */
    const editStrategyItem = () => {
        let data = {"name": newNameStratItem};
       
        strategyItemService.update(ID, data)
        .then(res => {
            console.log(res.data,ID);
            getStrategyItems();

            setOpenEdit(false);

        })
        .catch(e => {
            console.log(e);
        });
    };

    /**
     * Geeft alle strategyItems terug.
     */
    const getStrategyItems = useCallback(() => {
        strategyItemService.getAll()
        .then(res => {
             setNewStratItem(res.data);
             console.log("klawi",res.data)
        })
        .catch(e => {
            console.log(e);
        });
        }, [])

    /**
     * Geeft alle strategyItems terug na het renderen.
     */
    useEffect(()=>{
        console.log("rare dingen")

        getStrategyItems();

    },[getStrategyItems])

    /**
     * Opent een popup box.
     */
    function handleOpen() {
        setOpen(true);
    }

    /**
     * Sluit een popup box.
     */
   function handleClose() {
       setOpen(false);
    }

    /**
     * Opent een Delete popup box op basis van id.
     */
     const openDeleteDialog = (id) => {
         setOpenDelete(true);
         setID(id); 
    }

    /**
     * Sluit een Delete popup box.
     */
    const closeDeleteDialog = () => {
        setOpenDelete(false)
    }

    /**
     * Verwijdert een strategyItem op basis van id.
     */
    function deleteStrategyItem()
    {
        strategyItemService.delete(ID)
        .then(res => {
            console.log(res)
            getStrategyItems()
        })
        .catch(e => {
            console.error(e);
        })
        setOpenDelete(false);
    }
    const { classes } = props;
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

    /**
     * Opent een edit popup box.
     */
    const openEditDialog = (strategyItem) => {
       setCurrentStratItem(strategyItem);
       setID(strategyItem.id);
       setNewNameStratItem(strategyItem.name);
       setOpenEdit(true);
    };

    /**
     * Sluit een edit popup box.
     */
    const closeEditDialog = () => {
       setOpenEdit(false);
       setCurrentStratItem(null);
    }

    
    const editDialog = (
        <Dialog open={openEdit} onClose={() => {closeEditDialog()}} className={classes.dialog}>
            <DialogTitle>Edit strategy</DialogTitle>
            <DialogContent>
                <TextField
                        label="Name"
                        type="text"
                        variant="filled"
                        color="primary"
                        defaultValue={currentStratItem === null ? "" : newName}
                        onChange={(e) => setNewNameStratItem(e.target.value)}
                                                       
                    />
            </DialogContent>
            <DialogActions>
                <ButtonGroup>
                    <Button variant="text" color="primary" onClick={() => {editStrategyItem()}}>Edit</Button>
                    <Button variant="text" color="primary" onClick={() => {closeEditDialog()}}>Cancel</Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
    );
            
        return(
            
            
           
                
            
           
            
            <Container>
             <Paper className={clsx(classes.paper, classes.fixedHeight)}>
            <List>
            <ListSubheader className={classes.listSubHeader}>strategy Item list</ListSubheader>
                {newStratItem.map(strat => {
                    console.log("klawi3",strat)
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
                <Button variant="contained" color="primary" onClick={handleOpen}>Add Strategy Item</Button>
            </ButtonGroup>
            <Dialog onClose={handleClose} open={open} className={classes.dialog}>
                <DialogTitle>Create new Strategy Item</DialogTitle>
                <DialogContent>
                    <DialogContentText>{dialogtext}</DialogContentText>
                    <TextField
                        label="Name"
                        type="text"
                        variant="filled"
                        color="primary"
                        required
                        onChange={e => setNewNameStratItem(e.target.value)}
                    />
                    
                    
                      
                    
                </DialogContent>
                <DialogActions>
                    <ButtonGroup>
                        <Button variant="text" color="primary" onClick={(e)=>changeStateStratItem(e)}>Create</Button>
                        <Button variant="text" color="primary" onClick={handleClose}>Cancel</Button>
                    </ButtonGroup>
                </DialogActions>
            </Dialog>
        </Container>
        
        )
        
    }

 
export default withStyles(styles)(StrategyDetailView);