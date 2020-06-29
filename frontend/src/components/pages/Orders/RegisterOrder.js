import React, { Component } from "react";

//Redux
import { connect } from "react-redux";

import {
    withStyles,
    Button,
    Dialog,
    AppBar,
    Toolbar,
    Slide,
    Typography,
    Grid,
    TextField,
    MenuItem,
    Divider
} from "@material-ui/core";
import { listClientsAPI } from "../../../store/actions/clients";
import { listProductsAPI } from "../../../store/actions/products";
import { createOrderAPI } from "../../../store/actions/orders";
import ItemInfo from "./ItemInfo";

class RegisterOrder extends Component {

    state = {
        client: this.props.clients.clients[0],
        selectedProducts: [],
    };

    chooseClient = (event) => {
        this.setState({
            client: event.target.value
        });
    };

    editQuantity = (productId, quantity) => {
        let products = this.state.selectedProducts;
        for (let i = 0; i < this.state.selectedProducts.length; i++) {
            if (this.state.selectedProducts[i].id === productId) {
                products[i].quantity = quantity;
            }
        }
    };

    selectProducts = async (event) => {
        const product = event.target.value;
        let hasProductSelected = false;
        for (let i = 0; i < this.state.selectedProducts.length; i++) {
            if (this.state.selectedProducts[i].id === event.target.value.id) {
                hasProductSelected = true;
            }
        }
        if (!hasProductSelected) {
            await this.setState({
                selectedProducts: [...this.state.selectedProducts, product]
            })
        }
    };

    removeProduct = async (id) => {
        await this.setState(({
            selectedProducts: this.state.selectedProducts.filter(product => product.id !== id)
        }))
    };

    create = async () => {
        let items = [];
        for (let i = 0; i < this.state.selectedProducts.length; i++) {
            items.push({
                product: {
                    id: this.state.selectedProducts[i].id
                },
                amount: this.state.selectedProducts[i].quantity === undefined || 0 ? 1 : this.state.selectedProducts[i].quantity,
            })
        }

        let order = {
            client: {id: this.state.client.id},
            items: items,
            purchaseDate: "2020-06-21"
        };

        await this.props.createOrder(order);
        this.setState({
            client: this.props.clients.clients[0],
            selectedProducts: [],
        });
        this.props.handleClose();
    };

    render() {

        const {classes} = this.props;

        return (
            <div>
                <Dialog
                    fullScreen
                    open={this.props.open}
                    onClose={this.props.handleClose}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                Create Order
                            </Typography>
                            <Button color="inherit" onClick={this.props.handleClose}>
                                Close
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <div>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs={12} md={6}>
                                <Grid item xs={12} md={6} container style={{marginBottom: 16}}>
                                    <Grid item md={6} style={{marginBottom: 8}}>
                                        <Typography variant="h6">
                                            Select client
                                        </Typography>
                                    </Grid>
                                    <Grid item md={12}>
                                        <TextField
                                            id="outlined-select-currency"
                                            select
                                            label="Client"
                                            name="client"
                                            className={classes.textField}
                                            value={this.state.client}
                                            fullWidth
                                            onChange={this.chooseClient}
                                            SelectProps={{
                                                MenuProps: {
                                                    className: classes.menu
                                                }
                                            }}
                                            margin="dense"
                                            variant="outlined"
                                        >
                                            {this.props.clients.clients.map(client => (
                                                <MenuItem key={client.id} value={client}>
                                                    {client.name} | {client.cpf}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid item md={12} container style={{marginBottom: 16}}>
                                    <Grid item md={6} style={{marginBottom: 8}}>
                                        <Typography variant="h6">
                                            Select products
                                        </Typography>
                                    </Grid>
                                    <Grid item md={12}>
                                        <TextField
                                            id="outlined-select-currency"
                                            select
                                            label="Product"
                                            name="product"
                                            className={classes.textField}
                                            value={this.state.selectedProducts[0]}
                                            fullWidth
                                            onChange={this.selectProducts}
                                            SelectProps={{
                                                MenuProps: {
                                                    className: classes.menu
                                                }
                                            }}
                                            margin="dense"
                                            variant="outlined"
                                        >
                                            {this.props.products.products.map(option => (
                                                <MenuItem key={option.id} value={option}>
                                                    Name: {option.name} | Description: {option.description}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                                {this.state.selectedProducts.length !== 0 && (
                                    <div>
                                        <Grid item md={12}>
                                            <Grid item xs={12} md={12} container style={{marginBottom: 16}}>
                                                <Grid item md={6} style={{marginBottom: 8}}>
                                                    <Typography variant="h6">
                                                        Manage products
                                                    </Typography>
                                                </Grid>
                                                <Grid item md={12}>
                                                    {this.state.selectedProducts.map(item => (
                                                        <ItemInfo key={item.id}
                                                                  product={item}
                                                                  remove={this.removeProduct}
                                                                  editQuantity={this.editQuantity}
                                                        />
                                                    ))}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Divider style={{marginBottom: 32}}/>
                                        <div>
                                            <Grid item md={12} container justify="flex-end">
                                                <Grid item md={2}>
                                                    <Button fullWidth variant="contained" color="primary"
                                                            onClick={this.create}>
                                                        Finish
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                    </div>
                </Dialog>
            </div>
        );
    }
}

const styles = theme => ({
    appBar: {
        position: "relative",
        marginBottom: 64
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    },
    textField: {
        marginRight: theme.spacing(1)
    }
});

const mapStateToProps = state => ({
    clients: state.clients,
    products: state.products,
    orders: state.orders,
});

const mapDispatchToProps = (dispatch) => ({
    listClients: () => dispatch(listClientsAPI()),
    listProducts: () => dispatch(listProductsAPI()),
    createOrder: (order) => dispatch(createOrderAPI(order)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(RegisterOrder));