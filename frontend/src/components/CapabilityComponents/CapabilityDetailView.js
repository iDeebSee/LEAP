import React, { Component } from 'react';
import CapabilityService from "../../services/CapabilityService";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

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
        this.getCapability(this.props.match.params.name);
    }

    getCapability(name) {
        CapabilityService.get(name)
            .then(res => {
                this.setState({capability: res.data});
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        return(
            <div>
                {this.state.capability.name}
            </div>
        )
    }
}

export default withStyles(styles)(CapabilityDetailView);