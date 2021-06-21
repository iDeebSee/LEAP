import { Container, Grid, } from "@material-ui/core";
import React, { Component } from "react";
import CapabilityService from "../../../services/CapabilityService";
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

class CapabilitiesCardList extends Component {
    /**
     * Constructor van CapabilitiesCardList.
     * @param props gebruikte properties.
     */
    constructor(props) {
        super(props);

        this.getCapabilities = this.getCapabilities.bind(this);
        this.getCapabilityChildren = this.getCapabilityChildren.bind(this);
        this.sortCapabilities = this.sortCapabilities.bind(this);

        this.newCapabilityName = React.createRef();

        this.state = {
            capabilities: [],
            lvl1Capabilities: [],
            lvl2Capabilities: [],
            lvl3Capabilities: [],
        };
    }

    /**
     * Laat alle capabilities zien.
     */
    componentDidMount() {
        this.getCapabilities();
    }

    /**
     * Gebruikt om alle capabilities te krijgen.
     */
    getCapabilities() {
        CapabilityService.getAll()
            .then(res => {
                this.setState({capabilities: res.data});
                console.log("incoming capabilities", res.data);
                this.sortCapabilities();
            })
            .catch(e => {
                console.log(e);
            });
    }

    /**
     * Sorteert de capabilities op basis van hun level.
     */
    sortCapabilities() {
        let lvl1Capabilities = [], lvl2Capabilities = [], lvl3Capabilities = [];
        this.state.capabilities.forEach(capability => {       
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
    }

    /**
     * Pusht de level 2 en level 3 capabilities in de juiste variabele.
     * @param {*} capability 
     * @returns stopt de verschillende levels capabilities in de juiste property.
     */
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
            <Container>
                <Grid container spacing={3}>
                    {lvl1Capabilities.map(lvl1cap => {
                        return(
                            <Lvl1CapabilityCard key={nanoid()} data={this.getCapabilityChildren(lvl1cap)} handleDelete={this.onCardDelete}/>
                        )
                    })}
                </Grid>
            </Container>
        )
    }
}

export default withStyles(styles)(CapabilitiesCardList);