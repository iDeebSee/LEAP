import { Container, Grid, } from "@material-ui/core";
import React, { Component } from "react";
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

class StrategiesCardList extends Component {
    constructor(props) {
        super(props);

        this.getStrategies = this.getStrategies.bind(this);
        this.getStrategyItems = this.getStrategyItems.bind(this);
        this.sortStrategies = this.sortStrategies.bind(this);

        this.newStrategyName = React.createRef();

        this.state = {
            strategies: [],
            strategyItems: []
        };
    }

    componentDidMount() {
        this.getStrategies();
    }

    getStrategies() {
        StrategyService.getAll()
            .then(res => {
                this.setState({strategies: res.data});
                console.log("incoming strategies", res.data);
                this.sortStrategies();
            })
            .catch(e => {
                console.log(e);
            });
    }

    sortStrategies() {
        let strategyItem = [];
        this.state.strategies.forEach(strategy => {       

            strategyItem.push(strategy);
        });
        this.setState({strategyItem: strategyItem})
    }

    getStrategyItems(strategy) {
        const { strategyItems } = this.state;
        let strategyItems = [];

        strategyItems.forEach(item => {
            if(_.isEqual(item.parent, strategy)) {
                strategyItems.push(item);

            }
        })

        return {strategy: strategy, strategyItems: strategyItems}
    }

    render() {
        const { strategyItems } = this.state;
        return(
            <Container>
                <Grid container spacing={3}>
                    {strategyItems.map(item => {
                        return(
                            <StrategyItemCard key={nanoid()} data={this.getStrategyItems(item)} handleDelete={this.onCardDelete}/>
                        )
                    })}
                </Grid>
            </Container>
        )
    }
}

export default withStyles(styles)(StrategiesCardList);