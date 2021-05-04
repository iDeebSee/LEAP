import clsx from 'clsx';
import { Container, DialogContent, Grid, Paper, TextField, MenuItem, DialogActions, ButtonGroup, Button, Dialog, DialogTitle, Input, DialogContentText } from "@material-ui/core";
import React, { Component } from "react";
import CapabilityService from "../../services/CapabilityService";
import { nanoid } from 'nanoid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    buttonGroup: {
        '& a, button': {
            textTransform: 'none',
        }
    },
    dialog: {
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(2),
            width: '100%'
        }
    }
});

class CapabilitiesCardList extends Component {
    constructor(props) {
        super(props);

        this.getCapabilities = this.getCapabilities.bind(this);
        this.sortCapabilities = this.sortCapabilities.bind(this);
        this.onCardDelete = this.onCardDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.createCapability = this.createCapability.bind(this);

        this.dialogText = React.createRef();

        this.state = {
            capabilities: [],
            open: false,
            newCapabilityName: '',
            newCapabilityDescription: '',
            newCapabilityParent: null,
        };
    }

    componentDidMount() {
        this.getCapabilities();
    }

    getCapabilities() {
        CapabilityService.getAll()
            .then(res => {
                this.setState({capabilities: res.data});
                console.log("incoming capabilities", res.data);
                this.sortCapabilities();
            })
            .catch(e => {
                console.log(e);
            });
    }

    sortCapabilities() {

    }

    onCardDelete(capabilityId) {
        CapabilityService.delete(capabilityId)
        .then(() => {
            this.getCapabilities();
        });
    }

    createCapability() {
        if(this.state.newCapabilityName !== '' && this.state.newCapabilityDescription !== '') {
            console.log(this.state.newCapabilityParent)
            let data = {"name": this.state.newCapabilityName, "description": this.state.newCapabilityDescription};
            if(this.state.newCapabilityParent != null) {
                data.parentId = this.state.newCapabilityParent.id;
            }
            CapabilityService.create(data)
                .then(res => {
                    console.log(res);
                    this.setState({newCapabilityName: '', newCapabilityDescription: '', newCapabilityParent: {}})
                    this.getCapabilities();
                })
                .catch(e => {
                    console.log(e);
                })
        } else {
            this.dialogText.current.innerText = "Please make sure all required fields are filled in";
        }
        this.setState({open: false});
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }


    render() {
        const { classes } = this.props;
        return(
            <Container>
                <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                    <ButtonGroup className={classes.buttonGroup}>
                        <Button variant="contained" color="primary" onClick={this.handleOpen}>Add Capability</Button>
                        <Button variant="contained" color="primary">Generate Capability Map</Button>
                        <Button variant="contained" color="primary">Delete All</Button>
                    </ButtonGroup>
                    <Dialog onClose={this.handleClose} open={this.state.open} className={classes.dialog}>
                        <DialogTitle>Create new capability</DialogTitle>
                        <DialogContent>
                            <DialogContentText ref={this.dialogText}></DialogContentText>
                            <TextField
                                label="Name"
                                type="text"
                                variant="filled"
                                color="primary"
                                required
                                onChange={e => this.setState({newCapabilityName: e.target.value})}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                type="text"
                                variant="filled"
                                color="primary"
                                required
                                multiline
                                rowsMax={6}
                                rows={6}
                                onChange={e => this.setState({newCapabilityDescription: e.target.value})}
                            />
                            <TextField
                                label="Parent"
                                select
                                variant="filled"
                                color="primary"
                                defaultValue='None'
                                onChange={e => this.setState({newCapabilityParent: (e.target.value === "None" ? null : e.target.value) })}
                            >
                                <MenuItem value='None'>
                                    None
                                </MenuItem>
                                {this.state.capabilities.map(cap => {
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
                                <Button variant="text" color="primary" onClick={this.createCapability} type="submit">Create</Button>
                                <Button variant="text" color="primary" onClick={this.handleClose}>Cancel</Button>
                            </ButtonGroup>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </Container>
        )
    }
}

export default withStyles(styles)(CapabilitiesCardList);