import React, { Component } from "react";

//Redux
import { connect } from "react-redux";

// import AlterarCliente from "../../Dialogs/AlterarCliente";
// import Notificacao from "../../Notificacao/Notificacao";
import {
    withStyles,
    Grid,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Fade
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import {createClientAPI, deleteClientAPI, listClientsAPI} from "../../../store/actions/clients";
import EditClient from "../../pages/Clients/EditClient";

class Client extends Component {

    state = {
        anchorEl: null,
        open: false,
        editingClient: false,
        item: this.props.clients.clients[0]
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

    delete = async (id) => {
        await this.props.deleteClient(id);
    };

    openEditClient = async () => {
        await this.setState({
            item: {
                id: this.props.id,
                name: this.props.name,
                cpf: this.props.cpf,
                birthday: this.props.birthday

            },
        });
        await this.setState({
            editingClient: true
        });
    };

    closeEditClient = () => {
        this.setState({ editingClient: false });
    };


    render() {
        const {classes, id, name, cpf, birthday} = this.props;
        return (
            <div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.card}
                >
                    <Grid item xs={12}>
                        <IconButton
                            aria-haspopup="true"
                            onClick={this.handleClick}
                            color="inherit"
                        >
                            <MoreVert />
                        </IconButton>
                        <Menu
                            id="fade-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={this.state.open}
                            onClose={event => this.handleClose(event)}
                        >
                            <MenuItem onClick={this.openEditClient}>Edit</MenuItem>
                            <MenuItem onClick={() => this.delete(id)}>Delete</MenuItem>
                        </Menu>
                    </Grid>
                    <Grid item container justify="center" style={{ marginBottom: 8 }}>
                        <Grid item xs={4}>
                            <Typography variant="body1" style={{ fontWeight: "bold" }}>
                                Name:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{name}</Typography>
                        </Grid>
                    </Grid>

                    <Grid item container justify="center" style={{ marginBottom: 8 }}>
                        <Grid item xs={4}>
                            <Typography variant="body1" style={{ fontWeight: "bold" }}>
                                C.P.F.:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{cpf}</Typography>
                        </Grid>
                    </Grid>

                    <Grid item container justify="center" style={{ marginBottom: 8 }}>
                        <Grid item xs={4}>
                            <Typography variant="body1" style={{ fontWeight: "bold" }}>
                                Birthday:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">{birthday}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <EditClient
                    handleClose={this.closeEditClient}
                    open={this.state.editingClient}
                    item={this.state.item}
                />
            </div>
        );
    }
}

const styles = () => ({
    card: {
        backgroundColor: "#424242",
        borderRadius: 10,
        padding: 10
    }
});

const mapStateToProps = state => ({
    clients: state.clients
});

const mapDispatchToProps = (dispatch) => ({
    createClient: (client) => dispatch(createClientAPI(client)),
    deleteClient: (id) => dispatch(deleteClientAPI(id)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Client));