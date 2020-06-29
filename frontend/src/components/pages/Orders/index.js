import React, { Component } from "react";

//Redux
import { connect } from "react-redux";

import {
    withStyles,
    Grid,
    Typography,
    InputBase,
    Button
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import Order from "../../commons/cards/Order";
import RegisterOrder from "./RegisterOrder";
import { listOrdersAPI } from "../../../store/actions/orders";
import { listClientsAPI } from "../../../store/actions/clients";
import { listProductsAPI } from "../../../store/actions/products";


class Orders extends Component {
    state = {
        creating: false,
    };

    componentDidMount() {
        this.props.listProducts();
        this.props.listClients();
        this.props.listOrders();
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleClickOpen = () => {
        this.setState({
            creating: true
        });
    };

    handleClose = () => {
        this.setState({creating: false});
        this.props.listOrders();
    };

    render() {
        const {classes} = this.props;
        const orders = this.props.orders.orders;
        let isArray = require("isarray");
        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{marginBottom: 32,  width: 1000 }}
                >
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" align="left">
                            Orders
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                onChange={this.handleChange}
                                onKeyPress={this.handleChange}
                                name="search"
                                placeholder="search"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                inputProps={{"aria-label": "Search"}}
                            />
                        </div>
                    </Grid>

                    <Grid item xs={12} md={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleClickOpen}
                        >
                            Create
                        </Button>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={4}
                >
                    {
                        isArray(orders) && orders.map(order => (
                            <Grid item xs={12} md={3} key={order.id}>
                                <Order
                                    id={order.id}
                                    client={order.client}
                                    items={order.items}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
                <RegisterOrder
                    handleClose={this.handleClose}
                    open={this.state.creating}
                />
            </div>
        )
    }
};

const styles = theme => ({
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto"
        }
    },
    searchIcon: {
        width: theme.spacing(7),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputRoot: {
        color: "inherit"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: 200
        }
    }
});

const mapStateToProps = state => ({
    products: state.products,
    clients: state.clients,
    orders: state.orders
});

const mapDispatchToProps = (dispatch) => ({
    listOrders: () => dispatch(listOrdersAPI()),
    listProducts: () => dispatch(listProductsAPI()),
    listClients: () => dispatch(listClientsAPI()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Orders));