import { 
    Container, 
    DialogContent, 
    TextField, 
    MenuItem, 
    DialogActions, 
    ButtonGroup, 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContentText, 
} from "@material-ui/core";
import React, { Component } from "react";
import { nanoid } from 'nanoid';
import { withStyles } from '@material-ui/core/styles';
import EnvironmentList from '../components/EnvironmentList';
import EnvironmentService from "../services/Environment.Service";

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

class EnvirenmentView extends Component {
    constructor(props) {
        super(props);

        this.getenvironments = this.getenvironments.bind(this);
        this.onCardDelete = this.onCardDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.createEnvironment = this.createEnvironment.bind(this);

        this.state = {
            environments:[],
            dialogText: '',
            open: false
        };
    }

    componentDidMount() {
        this.getenvironments();
    }

    getenvironments() {
        EnvironmentService.getAll()
            .then(res => {
                this.setState({environments: res.data});
                console.log("incoming environments", res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    onCardDelete(environmentID) {
        EnvironmentService.delete(environmentID)
        .then(() => {
            this.getenvironments();
        });
    }

    createEnvironment() {
        let text = "";
        if(this.state.newEnvironmentName !== '' && this.state.newEnvironmentDescription !== '') {
            let data = {"name": this.state.newEnvironmentName, "description": this.state.newEnvironmentDescription};
            
            EnvironmentService.create(data)
                .then(res => {
                    console.log(res);
                    this.setState({newEnvironmentName: '', newEnvironmentDescription: ''})
                    this.getenvironments();
                })
                .catch(e => {
                    console.log(e);
                })
        } else {
            text = "Please make sure all required fields are filled in";
        }
        this.setState({open: false, dialogText: text});
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
                <EnvironmentList data={this.state.environments} getenvironments={this.getenvironments} onCardDelete={this.onCardDelete}/>
                <ButtonGroup className={classes.buttonGroup}>
                    <Button variant="contained" color="primary" onClick={this.handleOpen}>Add environment</Button>
                </ButtonGroup>
                <Dialog onClose={this.handleClose} open={this.state.open} className={classes.dialog}>
                    <DialogTitle>Create new Envirement</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{this.state.dialogText}</DialogContentText>
                        <TextField
                            label="Name"
                            type="text"
                            variant="filled"
                            color="primary"
                            required
                            onChange={e => this.setState({newEnvironmentName: e.target.value})}
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
                            onChange={e => this.setState({newEnvironmentDescription: e.target.value})}
                        />
                        
                          
                        
                    </DialogContent>
                    <DialogActions>
                        <ButtonGroup>
                            <Button variant="text" color="primary" onClick={this.createEnvironment}>Create</Button>
                            <Button variant="text" color="primary" onClick={this.handleClose}>Cancel</Button>
                        </ButtonGroup>
                    </DialogActions>
                </Dialog>
            </Container>
        )
    }
}

export default withStyles(styles)(EnvirenmentView);