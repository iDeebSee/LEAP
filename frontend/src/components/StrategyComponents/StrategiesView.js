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
import StrategyService from "../../services/Strategy.service";
import { withStyles } from '@material-ui/core/styles';
import StrategyList from './StrategyList'

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



class StrategiesView extends Component {
    /**
     * Constructor van StrategiesView.
     * @param props gebruikte properties.
     */
    constructor(props) {
        super(props);

        this.getStrategies = this.getStrategies.bind(this);
        this.onCardDelete = this.onCardDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.createStrategy = this.createStrategy.bind(this);

        this.state = {
            strategies: [],
            dialogText: '',
            open: false
        };
    }

    /**
     * Laad alle strategiën wanneer een pagina geladen wordt.
     */
    componentDidMount() {
        this.getStrategies();
    }

    /**
     * Geeft alle strategiën terug.
     */
    getStrategies() {
        StrategyService.getAll()
            .then(res => {
                this.setState({strategies: res.data});
                console.log("incoming strategies", res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    /**
     * Verwijderd een strategy op basis van id en geeft dan de resterende strategies terug.
     * @param strategyId de id van de strategy die verwijderd moet worden.
     */
    onCardDelete(strategyId) {
        StrategyService.delete(strategyId)
        .then(() => {
            this.getStrategies();
        });
    }

    /** 
     * Maakt een nieuwe strategy en geeft alle strategies terug.
     */
    createStrategy() {
        let text = "";
        if(this.state.newStrategyName !== '') {
            let data = {"name": this.state.newStrategyName};

            StrategyService.create(data)
                .then(res => {
                    console.log(res);
                    this.setState({newStrategyName: ''})
                    this.getStrategies();
                })
                .catch(e => {
                    console.log(e);
                })
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


    render() {
        const { classes } = this.props;
        return(
            <Container>
                <StrategyList data={this.state.strategies} getStrategies={this.getStrategies} onCardDelete={this.onCardDelete}/>
                <ButtonGroup className={classes.buttonGroup}>
                    <Button variant="contained" color="primary" onClick={this.handleOpen}>Add strategy</Button>
                </ButtonGroup>
                <Dialog onClose={this.handleClose} open={this.state.open} className={classes.dialog}>
                    <DialogTitle>Create new strategy</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{this.state.dialogText}</DialogContentText>
                        <TextField
                            label="Name"
                            type="text"
                            variant="filled"
                            color="primary"
                            required
                            onChange={e => this.setState({newStrategyName: e.target.value})}
                        />

                    </DialogContent>
                    <DialogActions>
                        <ButtonGroup>
                            <Button variant="text" color="primary" onClick={this.createStrategy}>Create</Button>
                            <Button variant="text" color="primary" onClick={this.handleClose}>Cancel</Button>
                        </ButtonGroup>
                    </DialogActions>
                </Dialog>
            </Container>
        )
    }
}

export default withStyles(styles)(StrategiesView);
