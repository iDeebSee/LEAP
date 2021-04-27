import React, {Component} from "react";
import CapabilityService from "../../services/CapabilityService";
import CapabilityListItem from "./CapabilitiesListItem"
import { nanoid } from 'nanoid';

export default class CapabilitiesListView extends Component {
    constructor(props) {
        super(props);

        this.getCapabilities = this.getCapabilities.bind(this)
        
        this.state = {
            capabilities: [],
        };
    }

    componentDidMount() {
        let test1 = {"name": "test 1", "description": "this is the 1st test"}, test11 = {"name": "test 1.1", "description": "this is the 1st test child of the 1st test", "parent":test1}
        CapabilityService.deleteAll().then();
        CapabilityService.create(test1)
            .then(res => {
                console.log(res);
                console.log("success");
            });
            CapabilityService.create(test11)
            .then(res => {
                console.log(res);
                console.log("success");
            });
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
        const {capabilities} = this.state;

        return (
            <div>
                <ul>
                {capabilities.map(cap => {
                        return (
                            <CapabilityListItem capability={cap} key={nanoid()}/>
                        )
                    })}
                </ul>
            </div>
        )
    }
}