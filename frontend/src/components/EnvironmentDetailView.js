import React, { Component } from 'react';
import EnvironmentService from "../services/Environment.Service";
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';

const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
});

class EnvironmentDetailView extends Component {
    /**
     * Constructor van EnvironmentDetailView
     * @param props de gebruikte properties.
     */
    constructor(props) {
        super(props);

        this.getEnvironments = this.getEnvironments.bind(this);

        this.state = {
            Environment: {},
        };
    }

    /**
     * Laadt de juiste enivronment op basis van de id.
     */
    componentDidMount() {
        this.getEnvironments(this.props.match.params.id);
    }

    /**
     * Wordt gebruikt om een specifieke environment terug te krijgen.
     * @param id de id van de environment die opgehaald moet worden.
     */
    getEnvironments(id) {
        EnvironmentService.get(id)
            .then(res => {
                console.log(res.data.message);
                console.log(res.data.data)
                this.setState({Environment: res.data.data});
                
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { classes } = this.props;

        
        return(
            <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                <Grid container spacing={3}>
                    <Grid item>
                        <Typography>Name: {this.state.Environment.name}</Typography>
                        <Typography component="p">Description: {this.state.Environment.description}</Typography>
                    </Grid>
                    
                </Grid>
            </Paper>
        )
    }
}

export default withStyles(styles)(EnvironmentDetailView);