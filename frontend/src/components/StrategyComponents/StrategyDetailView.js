import React, { Component } from 'react';
import StrategyService from "../../services/Strategy.service";
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

class StrategyDetailView extends Component {
    constructor(props) {
        super(props);

        this.getStrategy = this.getStrategy.bind(this);

        this.state = {
            strategy: {},
        };
    }

    componentDidMount() {
        this.getStrategy(this.props.match.params.id);
    }

    getStrategy(id) {
        StrategyService.get(id)
            .then(res => {
                this.setState({strategy: res.data});
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
                        <Typography>Name: {this.state.strategy.name}</Typography>
                        
                    </Grid>
                </Grid>
                
            </Paper>
        )
    }
}

export default withStyles(styles)(StrategyDetailView);