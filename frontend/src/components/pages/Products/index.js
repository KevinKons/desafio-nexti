import React, { Component } from "react";
import { connect } from "react-redux";

import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";

import {
    withStyles,
    Grid,
    Typography,
    InputBase,
    Button
} from "@material-ui/core";
import { createProductAPI, listProductsAPI } from "../../../store/actions/products";
import Product from "../../commons/cards/Product";
import RegisterProduct from "./RegisterProduct";

class Products extends Component {

    state = {
        creating: false,
    };

    componentDidMount() {
        this.props.listProducts();
    }

    handleClickOpen = () => {
        this.setState({
            creating: true
        });
    };

    handleClose = () => {
        this.setState({ creating: false });
        this.props.listProducts();
    };

    render() {
        const { classes } = this.props;
        let isArray = require("isarray");
        let products = this.props.products.products;
        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{ marginBottom: 32, width: 1000 }}
                >
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" align="left">
                            Products
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                onChange={this.handleChange}
                                onKeyPress={this.handleChange}
                                name="search"
                                placeholder="Search"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput
                                }}
                                inputProps={{ "aria-label": "Search" }}
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
                    alignItems="center"
                    spacing={4}
                >
                    {isArray(products) && products.map(product => (
                        <Grid item xs={12} md={3} key={product.id}>
                            <Product
                                id={product.id}
                                sku={product.sku}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                amount={product.amount}
                            />
                        </Grid>
                    ))}
                </Grid>

                <RegisterProduct
                    handleClose={this.handleClose}
                    open={this.state.creating}
                />
            </div>
        );

    }
}

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
    products: state.products
});

const mapDispatchToProps = (dispatch) => ({
    createProduct: (product) => dispatch(createProductAPI(product)),
    listProducts: () => dispatch(listProductsAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Products));
