import React, {Component} from "react";

import {withStyles, Grid, Typography, TextField, IconButton} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";

class ItemInfo extends Component {

    state = {
        quantity: 1,
    };

    editQuantity = (product, quantity) => {
        this.setState({
            quantity: quantity
        });
        this.props.editQuantity(product.id, quantity)
    }

    render() {
        const { classes, product } = this.props;

        return (
            <div style={{marginBottom: 32}}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    className={classes.card}
                >
                    <Grid item md={2}>
                        <Grid item xs={12}>
                            <Typography variant="body1" style={{fontWeight: 600}}>
                                Name:
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">{product.name}</Typography>
                        </Grid>
                    </Grid>

                    <Grid item md={5}>
                        <Grid item xs={12}>
                            <Typography variant="body1" style={{fontWeight: 600}}>
                                Description:
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" noWrap={true}>
                                {product.description}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item md={5}>
                        <Grid item xs={12}>
                            <Typography variant="body1" style={{fontWeight: 600}}>
                                Price:
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" noWrap={true}>
                                {product.price}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item md={1}>
                        <TextField
                            required
                            fullWidth
                            name="quantity"
                            id="outlined-quantity"
                            label="Quantity"
                            value={this.state.quantity}
                            onChange={event => this.editQuantity(product, event.target.value)}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                className: classes.labelTxtField
                            }}
                        />
                    </Grid>
                    <Grid item md={1}>
                        <IconButton aria-label="Delete" className={classes.margin}
                                    onClick={() => this.props.id === undefined ? this.props.remove(product.id) : this.props.remove(this.props.id)}>
                            <Delete/>
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const styles = () => ({
    card: {
        backgroundColor: "#333333",
        borderRadius: 5,
        padding: 10,
        minHeight: 80
    }
});

export default withStyles(styles)(ItemInfo);