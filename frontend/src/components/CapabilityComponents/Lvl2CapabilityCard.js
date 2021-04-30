import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardActions,
    ButtonGroup,
    Button,
    Grid,
    withStyles,
    Typography
} from '@material-ui/core';
import { nanoid } from 'nanoid';
import Lvl3CapabilityCard from "./Lvl3CapabilityCard";

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

class Lvl2CapabilityCard extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            capability: this.props.data.capability,
            children: this.props.data.children,
        }
    }

    handleDelete(capability) {
        this.setState({capability: {}, children: []});
        this.props.handleDelete(capability);
    }

    render() {
        const { classes } = this.props, { capability, children } = this.state;

        let Lvl3CardGrid;
        if(children.length > 0) {
            Lvl3CardGrid =
            <Grid container spacing={2}>
                {
                    children.map(lvl3Cap => {
                        return (
                            <Lvl3CapabilityCard key={nanoid()} data={lvl3Cap} handleDelete={this.handleDelete}/>
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
                        {Lvl3CardGrid}
                    </CardContent>
                    <CardActions>
                        <ButtonGroup color="primary" className={classes.buttonGroup}>
                            <Button component={Link} to={`/view/${capability.name}`} className={classes.button}>View</Button>
                            <Button className={classes.button} onClick={() => this.handleDelete(capability.name)}>Delete</Button>
                        </ButtonGroup>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(styles)(Lvl2CapabilityCard);