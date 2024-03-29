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
import EnvironmentList from './EnvironmentList';
import EnvironmentService from "../../services/Environment.Service";

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
        this.setEnvId = this.setEnvId.bind(this);

        this.state = {
            environments:[],
            dialogText: '',
            open: false
        };
    }

    componentDidMount() {
        this.getenvironments();
    }

    /**
     * Geeft alle environments terug.
     */
    getenvironments() {
        EnvironmentService.getAll()
            .then(res => {
                console.log(res.data.message);
                console.table(res.data.data)
                this.setState({environments: res.data.data});
                
            })
            .catch(e => {
                console.log(e);
            });
    }

    /**
     * Verwijdert een enivronment op basis van ID.
     * @param environmentID id van de environment die je wilt verwijderen.
     */
    onCardDelete(environmentID) {
        EnvironmentService.delete(environmentID)
        .then(() => {
            this.getenvironments();
        });
    }

    /**
     * Maakt een nieuwe environment aan en controleert of alles ingevuld is..
     */
    createEnvironment() {
        let text = "";
        if(this.state.newEnvironmentName !== '') {
            let data = {name: this.state.newEnvironmentName};
            
            EnvironmentService.create(data)
                .then(res => {
                    console.log(res);
                    this.setState({newEnvironmentName: ''})
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

    /**
     * Opent een popup box.
     */
    handleOpen() {
        this.setState({open: true});
    }

    /**
     * Sluit een popup box.
     */
    handleClose() {
        this.setState({open: false});
    }

    setEnvId(id) {
        this.props.setEnvId(id)
    }

    render() {
        const { classes } = this.props;
        return(
            <Container>
                <EnvironmentList data={this.state.environments} getenvironments={this.getenvironments} onCardDelete={this.onCardDelete} setEnvId={this.setEnvId}/>
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