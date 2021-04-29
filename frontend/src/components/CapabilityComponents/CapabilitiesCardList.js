import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import CapabilityService from "../../services/CapabilityService";
import Lvl1CapabilityCard from './Lvl1CapabilityCard';
import { nanoid } from 'nanoid';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
    },
    card: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
});

class CapabilitiesCardList extends Component {
    constructor(props) {
        super(props);

        this.getCapabilities = this.getCapabilities.bind(this);
        this.getCapabilityChildren = this.getCapabilityChildren.bind(this);

        this.state = {
            lvl1Capabilities: [],
            lvl2Capabilities: [],
            lvl3Capabilities: []
        };
    }

    componentDidMount() {
        this.getCapabilities();
    }

    getCapabilities() {
        CapabilityService.getAll()
            .then(res => {
                let lvl1Capabilities = [], lvl2Capabilities = [], lvl3Capabilities = [];
                res.data.forEach(capability => {
                    
                    switch(capability.level) {
                        case 1: 
                            lvl1Capabilities.push(capability);
                            break;
                        case 2:
                            lvl2Capabilities.push(capability);
                            break;
                        case 3:
                            lvl3Capabilities.push(capability);
                            break;
                        default:
                        break;
                    }
                });
                this.setState({lvl1Capabilities: lvl1Capabilities, lvl2Capabilities: lvl2Capabilities, lvl3Capabilities: lvl3Capabilities})
                console.log("incoming capabilities", res.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    getCapabilityChildren(capability) {
        const { lvl2Capabilities, lvl3Capabilities } = this.state;
        let lvl2Children = [], lvl3Children = [];

        lvl2Capabilities.forEach(lvl2Cap => {
            if(_.isEqual(lvl2Cap.parent, capability)) {
                lvl2Children.push(lvl2Cap);

                lvl3Capabilities.forEach(lvl3Cap => {
                    if(_.isEqual(lvl3Cap.parent, lvl2Cap)) {
                        lvl3Children.push(lvl3Cap)
                    }
                })
            }
        })

        return {capability: capability, lvl2Children: lvl2Children, lvl3Children: lvl3Children}
    }

    render() {
        const { lvl1Capabilities } = this.state;

        return(
            <Grid container spacing={3}>
                {lvl1Capabilities.map(lvl1cap => {
                    return(
                        <Lvl1CapabilityCard key={nanoid()} data={this.getCapabilityChildren(lvl1cap)}/>
                    )
                })}
            </Grid>
        )
    }
}

export default withStyles(styles)(CapabilitiesCardList);