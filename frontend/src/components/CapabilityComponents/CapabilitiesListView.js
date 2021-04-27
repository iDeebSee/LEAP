import React, {Component} from "react";
import CapabilityService from "../../services/CapabilityService";
import CapabilityListItem from "./CapabilitiesListItem"
import { nanoid } from 'nanoid';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
    },
});
class CapabilitiesListView extends Component {
    constructor(props) {
        super(props);

        this.getCapabilities = this.getCapabilities.bind(this)
        
        this.state = {
            capabilities: [],
        };
    }

    componentDidMount() {
        this.getCapabilities();
    }

    getCapabilities() {
        CapabilityService.getAll()
            .then(res => {
                this.setState({capabilities: res.data});
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {capabilities} = this.state, classes = this.props;

        return (
            <div className={classes.root}>
                <List component="ul">
                {capabilities.map(cap => {
                        return (
                            <CapabilityListItem capability={cap} key={nanoid()}/>
                        )
                    })}
                </List>
            </div>
        )
    }
}

export default withStyles(styles)(CapabilitiesListView)