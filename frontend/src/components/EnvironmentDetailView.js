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

    constructor(props) {
        super(props);

        this.getEnvironments = this.getEnvironments.bind(this);

        this.state = {
            Environment: {},
        };
    }

    componentDidMount() {
        this.getEnvironments(this.props.match.params.id);
    }

    getEnvironments(id) {
        EnvironmentService.get(id)
            .then(res => {
                this.setState({Environment: res.data});
                console.log(res.data);
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