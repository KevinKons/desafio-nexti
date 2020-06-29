import React, { Component } from "react";

import { connect } from "react-redux";
import { createProductAPI } from "../../../store/actions/products";

import {
    withStyles,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    IconButton,
    Typography,
    Button
} from "@material-ui/core";
import InputMask from "react-input-mask";
import Close from "@material-ui/icons/Close";
import {createClientAPI} from "../../../store/actions/clients";

class RegisterProduct extends Component {

    state = {
        sku: "",
        name: "",
        description: "",
        price: 0,
        amount: 0
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    create = async () => {
        const { name, sku, description, price, amount } = this.state;
        let product = {
            name: name,
            sku: sku,
            description: description,
            price: price,
            amount: amount
        };
        await this.props.createProduct(product);
        this.props.handleClose();
    };


    render() {
        const { classes } = this.props;
        const { name, sku, description, price, amount } = this.state;
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    keepMounted
                    onClose={this.props.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    maxWidth="sm"
                    fullWidth={true}
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item md={11}>
                                <Typography variant="h6">Register Product</Typography>
                            </Grid>
                            <Grid item md={1}>
                                <IconButton
                                    className={classes.button}
                                    aria-label="Delete"
                                    onClick={this.props.handleClose}
                                >
                                    <Close />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </DialogTitle>
                    <DialogContent>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="flex-start"
                        >
                            <Grid item md={6} style={{ paddingRight: 4 }}>
                                <Grid item md={12}>
                                    <TextField
                                        onChange={this.handleChange}
                                        required
                                        label="sku"
                                        margin="normal"
                                        variant="outlined"
                                        id="outlined-sku"
                                        name="sku"
                                        value={sku}
                                        fullWidth
                                        InputProps={{
                                            className: classes.labelTxtField
                                        }}
                                    />
                                </Grid>
                                <Grid item md={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="name"
                                        id="outlined-name"
                                        label="Name"
                                        value={name}
                                        onChange={this.handleChange}
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{
                                            className: classes.labelTxtField
                                        }}
                                    />
                                </Grid>
                                <Grid item md={12}>
                                    <TextField
                                        onChange={this.handleChange}
                                        required
                                        label="description"
                                        margin="normal"
                                        variant="outlined"
                                        id="outlined-description"
                                        name="description"
                                        value={description}
                                        fullWidth
                                        InputProps={{
                                            className: classes.labelTxtField
                                        }}
                                    />
                                </Grid>
                                <Grid item md={12}>
                                    <TextField
                                        onChange={this.handleChange}
                                        required
                                        label="price"
                                        margin="normal"
                                        variant="outlined"
                                        id="outlined-price"
                                        name="price"
                                        value={price}
                                        fullWidth
                                        InputProps={{
                                            className: classes.labelTxtField
                                        }}
                                    />
                                </Grid>
                                <Grid item md={12}>
                                    <TextField
                                        onChange={this.handleChange}
                                        required
                                        label="amount"
                                        margin="normal"
                                        variant="outlined"
                                        id="outlined-amount"
                                        name="amount"
                                        value={amount}
                                        fullWidth
                                        InputProps={{
                                            className: classes.labelTxtField
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.create}
                            color="primary"
                            variant="contained"
                        >
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2)
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    },
    personIcon: {
        fontSize: 80,
        color: "#424242",
        backgroundColor: "#fff",
        borderRadius: "50%",
        marginBottom: 16
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    labelTxtField: {
        color: "#fff"
    }
});

const mapDispatchToProps = (dispatch) => ({
    createProduct: (product) => dispatch(createProductAPI(product)),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(RegisterProduct));