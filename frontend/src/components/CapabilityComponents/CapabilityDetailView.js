import React, { Component } from 'react';
import CapabilityService from "../../services/Capability.service";
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

class CapabilityDetailView extends Component {
    constructor(props) {
        super(props);

        this.getCapability = this.getCapability.bind(this);

        this.state = {
            capability: {},
        };
    }

    componentDidMount() {
        this.getCapability(this.props.match.params.id);
    }

    getCapability(id) {
        CapabilityService.get(id)
            .then(res => {
                this.setState({capability: res.data});
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { classes } = this.props;

        let parent = null;
        if(this.state.capability.parent !== null && this.state.capability.parent !== undefined) {
            parent =
            <Grid item>
                <Typography>Parent: {this.state.capability.parent.name}</Typography>
            </Grid>
        }
        return(
            <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                <Grid container spacing={3}>
                    <Grid item>
                        <Typography>Name: {this.state.capability.name}</Typography>
                        <Typography component="p">Description: {this.state.capability.description}</Typography>
                    </Grid>
                    {parent}
                </Grid>
                
            </Paper>
        )
    }
}

export default withStyles(styles)(CapabilityDetailView);