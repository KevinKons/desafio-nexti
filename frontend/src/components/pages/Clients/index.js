import React, { Component } from "react";
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
import RegisterClient from "./RegisterClient";
import Client from "../../commons/cards/Client";
import { createClientAPI, listClientsAPI } from "../../../store/actions/clients";

class Clients extends Component {

    state = {
        creatingClient: false,
        search: ""
    };

    componentDidMount() {
        this.props.listClients();
    }

    handleChange = (event ) => {
      this.setState({
          [event.target.name]: event.target.value
      })
    };

    handleClickOpen = () => {
        this.setState({
            creatingClient: true
        });
    };

    handleClose = () => {
        this.setState({ creatingClient: false });
        this.props.listClients();
    };

    render() {
        const { classes } = this.props;
        let clients = this.props.clients.clients;
        let isArray = require("isarray");
        const search = this.state.search;

        if(search.length >= 1) {
            clients = clients.filter(client => client.name.toLowerCase().includes(search.toLowerCase()))
        }

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
                            Clients
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
                    {isArray(clients) && clients.map(client => (
                        <Grid item xs={12} md={3} key={client.id}>
                            <Client
                                id={client.id}
                                name={client.name}
                                cpf={client.cpf}
                                birthday={client.birthday}
                            />
                        </Grid>
                    ))}
                </Grid>

                <RegisterClient
                    handleClose={this.handleClose}
                    open={this.state.creatingClient}
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
    clients: state.clients
});

const mapDispatchToProps = (dispatch) => ({
    createClient: (client) => dispatch(createClientAPI(client)),
    listClients: () => dispatch(listClientsAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Clients));