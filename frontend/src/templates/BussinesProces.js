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
} from "@material-ui/core";
import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import BussinesProcesList from '../components/BussinesProcesList';
import BussinesProcesService from "../services/BussinesProces.service";

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

class BussinesProcesView extends Component {
    constructor(props) {
        super(props);
        this.getBussinesProcess = this.getBussinesProcess.bind(this);
        this.onCardDelete = this.onCardDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.createBussinesProces = this.createBussinesProces.bind(this);


        

        this.state = {
            bussinesProces:[],
            dialogText: '',
            open: false
            
        };
    }
    componentDidMount(){
        this.getBussinesProcess();
    }
   

    getBussinesProcess() {
        BussinesProcesService.getAll()
            .then(res => {
                this.setState({bussinesProces: res.data});
                console.log("incoming bussines processes", res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    onCardDelete(bussinesProcesID) {
        BussinesProcesService.delete(bussinesProcesID)
        .then(() => {
            this.getBussinesProcess();
        });
    }

    createBussinesProces() {
        let text = "";
        if(this.state.newBussinesProcesName !== '' && this.state.newBussinesProcesDescription !== '') {
            let data = {"name": this.state.newBussinesProcesName, "description": this.state.newBussinesProcesDescription};
            
            BussinesProcesService.create(data)
                .then(res => {
                    console.log(res);
                    this.setState({newBussinesProcesName: '', newBussinesProcesDescription: ''})
                    this.getBussinesProcess();
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
                <BussinesProcesList data={this.state.bussinesProces} getBussinesProcess={this.getBussinesProcess} onCardDelete={this.onCardDelete}/>
                <ButtonGroup className={classes.buttonGroup}>
                    <Button variant="contained" color="primary" onClick={this.handleOpen}>Add BussinesProces</Button>
                </ButtonGroup>
                <Dialog onClose={this.handleClose} open={this.state.open} className={classes.dialog}>
                    <DialogTitle>Create new bussines proces</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{this.state.dialogText}</DialogContentText>
                        <TextField
                            label="Name"
                            type="text"
                            variant="filled"
                            color="primary"
                            required
                            onChange={e => this.setState({newBussinesProcesName: e.target.value})}
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
                            onChange={e => this.setState({newBussinesProcesDescription: e.target.value})}
                        />
                        
                          
                        
                    </DialogContent>
                    <DialogActions>
                        <ButtonGroup>
                            <Button variant="text" color="primary" onClick={this.createBussinesProces}>Create</Button>
                            <Button variant="text" color="primary" onClick={this.handleClose}>Cancel</Button>
                        </ButtonGroup>
                    </DialogActions>
                </Dialog>
            </Container>
        )
    }
}

export default withStyles(styles)(BussinesProcesView);