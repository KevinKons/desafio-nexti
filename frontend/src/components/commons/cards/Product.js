import React, {Component} from "react";

import {
    withStyles,
    Grid,
    Typography,
} from "@material-ui/core";

class Product extends Component {

    render() {
        const {classes, sku, name, description, price, amount} = this.props;
        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.card}
                >
                    <Grid item container justify="center" style={{marginBottom: 8}}>
                        <Grid item xs={4}>
                            <Typography variant="body1" style={{fontWeight: "bold"}}>
                                Name:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{name}</Typography>
                        </Grid>
                    </Grid>

                    <Grid item container justify="center" style={{marginBottom: 8}}>
                        <Grid item xs={4}>
                            <Typography variant="body1" style={{fontWeight: "bold"}}>
                                S.K.U.:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{sku}</Typography>
                        </Grid>
                    </Grid>

                    <Grid item container justify="center" style={{marginBottom: 8}}>
                        <Grid item xs={4}>
                            <Typography variant="body1" style={{fontWeight: "bold"}}>
                                Description:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{description}</Typography>
                        </Grid>
                    </Grid>

                    <Grid item container justify="center" style={{marginBottom: 8}}>
                        <Grid item xs={4}>
                            <Typography variant="body1" style={{fontWeight: "bold"}}>
                                Price:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{price}</Typography>
                        </Grid>
                    </Grid>

                    <Grid item container justify="center" style={{marginBottom: 8}}>
                        <Grid item xs={4}>
                            <Typography variant="body1" style={{fontWeight: "bold"}}>
                                Amount:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{amount}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


const styles = () => ({
    card: {
        backgroundColor: "#424242",
        borderRadius: 10,
        padding: 10
    }
});

export default withStyles(styles)(Product);