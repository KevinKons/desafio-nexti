import React, {Component} from "react";

//Redux
import {connect} from "react-redux";

import {
    withStyles,
    Grid,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Fade,
    Collapse,
    CardContent
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from "clsx";

class Order extends Component {
    state = {
        anchorEl: null,
        open: false,
        id: this.props.id,
        cliente: this.props.client,
        itens: this.props.items,
        expand: false
    };

    handleClick = event => {
        this.setState({
            anchorEl: event.target,
            open: true
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
            open: false
        });
    };

    expand = () => {
        this.setState({
            expand: !this.state.expand
        })
    }

    render() {
        const {classes, client, items} = this.props;
        let isArray = require("isarray");

        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    className={classes.card}
                >
                    <Grid item container justify="center" alignItems="flex-start" style={{marginBottom: 16}}>
                        <Grid item xs={6}>
                            <Typography variant="body1" style={{fontWeight: "bold"}}>
                                Name:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{client.name}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant="body1"
                            style={{fontWeight: "bold", marginBottom: 8}}
                        >
                            Products:
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {isArray(items) && items.map(item => (
                            <div key={item.id}>
                                <Grid container direction="row" justify="space-between" alignItems="center">
                                    <Grid item md={10}>
                                        <Typography variant="body1">
                                            {item.product.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item md={2}>
                                        <IconButton
                                            className={clsx(classes.expand, {
                                                [classes.expandOpen]: this.state.expand,
                                            })}
                                            onClick={this.expand}
                                            aria-expanded={this.state.expand}
                                            aria-label="Show more"
                                        >
                                            <ExpandMoreIcon/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Collapse in={this.state.expand} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Grid item container justify="flex-start" alignItems="flex-start"
                                        >
                                            <Grid item xs={3}>
                                                <Typography variant="body1" style={{fontWeight: "bold"}}>
                                                    Description:
                                                </Typography>
                                            </Grid>
                                            <Grid item md={12} style={{marginBottom: 8}}>
                                                <Typography paragraph>
                                                    {item.product.description}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="body1" style={{fontWeight: "bold"}}>
                                                    Price:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={9} style={{marginBottom: 8}}>
                                                <Typography variant="body1">{item.product.price}</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="body1" style={{fontWeight: "bold"}}>
                                                    Quantity:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={3} style={{marginBottom: 8}}>
                                                <Typography variant="body1">{item.amount}</Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Collapse>
                            </div>
                        ))}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const styles = (theme) => ({
    card: {
        backgroundColor: "#424242",
        borderRadius: 10,
        padding: 10,
        minHeight: 350
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
});


export default withStyles(styles)(Order);