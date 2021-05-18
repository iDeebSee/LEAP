import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    Grid,
    withStyles,
    Typography,
    Button,
    CardActions,
    ButtonGroup
} from '@material-ui/core';
import { nanoid } from 'nanoid';
import Lvl2CapabilityCard from "./Lvl2CapabilityCard";
import _ from 'lodash'

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        '&:hover': {
            '& $buttonGroup': {
                display: 'inline'
            }
        },
    },
    title: {
        fontSize: 14,
    },
    button: {
        textTransform: 'none',
    },
    buttonGroup: {
        display: 'none',
    },
});

class StrategyItems extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            strategy: this.props.data.strategy,
        }
    }

    handleDelete(strategy) {
        this.setState({strategy: {}});
        this.props.handleDelete(strategy);
    }

    render() {
        const { classes } = this.props, { strategy} = this.state;

        let Lvl2CardGrid;
        if(lvl2Children.length > 0) {
            Lvl2CardGrid =
            <Grid container spacing={2}>
                {
                    lvl2Children.map(lvl2Cap => {
                        let children = [];
                        lvl3Children.forEach(lvl3Cap => {
                            if(_.isEqual(lvl3Cap.parent, lvl2Cap)) {
                                children.push(lvl3Cap);
                            }
                        });
                        return(
                            <Lvl2CapabilityCard key={nanoid()} data={{capability: lvl2Cap, children: children}} handleDelete={this.handleDelete}/>
                        )
                    })
                }
            </Grid>
        }

        return(
            <Grid item xs>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>{capability.name}</Typography>
                        {Lvl2CardGrid}
                    </CardContent>
                    <CardActions>
                        <ButtonGroup color="primary" className={classes.buttonGroup}>
                            <Button component={Link} to={`/strategy/${strategy.id}`} className={classes.button}>View</Button>
                            <Button className={classes.button} onClick={() => this.handleDelete(strategy.id)}>Delete</Button>
                        </ButtonGroup>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(styles)(StrategyItems);