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
     * Constructor of StrategiesView
     * @param props Used properties.
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
    Shows all strategies when the page is loaded.
    */
    componentDidMount() {
        this.getStrategies();
    }
    /**
    * Evokes all strategies from the repository and shows them in the strategylist.
    */
    getStrategies() {
        StrategyService.getAll(this.props.match.params.envId)
            .then(res => {
                console.log(res.data.message);
                console.table(res.data.data);
                this.setState({strategies: res.data.data});
            })
            .catch(e => {
                console.log(e);
            });
    }
    /**
    * Removes a strategy based on the id. Once its removed the method gives back the remaining strategies.
    * @param strategyId the id a strategy gets deleted by.
    */
    onCardDelete(envId, strategyId) {
        StrategyService.delete(envId, strategyId)
        .then(() => {
            this.getStrategies();
        });
    }

    /** 
    * Constructs a new strategy and adds it to the repository. 
    */
    createStrategy() {
        let text = "";
        if(this.state.newStrategyName !== '') {
            StrategyService.create(this.props.match.params.envId, this.state.newStrategyName)
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
    * Opens an "add strategy" popup box when triggered.
    */
    handleOpen() {
        this.setState({open: true});
    }
    /**
    * Closes an "add strategy" popup box when triggered.
    */
    handleClose() {
        this.setState({open: false});
    }


    render() {
        const { classes } = this.props;
        return(
            <Container>
                <StrategyList data={this.state.strategies} getStrategies={this.getStrategies} onCardDelete={this.onCardDelete} envId={this.props.match.params.envId}/>
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
