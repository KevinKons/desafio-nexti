import React, {Component} from "react";

//Redux
import {connect} from "react-redux";
import { editClientAPI } from "../../../store/actions/clients";

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

class EditClient extends Component {

    state = {
        id: 0,
        name: "",
        cpf: "",
        birthday: ""
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    edit = async () => {
        console.log("editando Client")
        const { id, name, cpf, birthday} = this.state;
        let client = {
            id: id,
            name: name,
            cpf: cpf.replace(/[^\d]+/g, ""),
            birthday: birthday.replace(/[^\d]+/g, "-")
        };
        await this.props.editClient(client);
        this.props.handleClose();
    }

    async componentWillReceiveProps() {
        const { id, name, cpf, birthday } = this.props.item;
        await this.setState({
            id: id,
            name: name,
            cpf: cpf,
            birthday: birthday
        });
    }

    render() {
        const {classes} = this.props;
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
                                <Typography variant="h6">Edit Client</Typography>
                            </Grid>
                            <Grid item md={1}>
                                <IconButton
                                    className={classes.button}
                                    aria-label="Delete"
                                    onClick={this.props.handleClose}
                                >
                                    <Close/>
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
                            <Grid item md={6} style={{paddingRight: 4}}>
                                <Grid item md={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="name"
                                        id="outlined-name"
                                        label="Name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{
                                            className: classes.labelTxtField
                                        }}
                                    />
                                </Grid>
                                <Grid item md={12}>
                                    <InputMask
                                        mask="999.999.999-99"
                                        value={this.state.cpf}
                                        onChange={this.handleChange}
                                    >
                                        {() => (
                                            <TextField
                                                required
                                                label="C.P.F."
                                                margin="normal"
                                                variant="outlined"
                                                id="outlined-cpf"
                                                name="cpf"
                                                value={this.state.cpf}
                                                fullWidth
                                                InputProps={{
                                                    className: classes.labelTxtField
                                                }}
                                            />
                                        )}
                                    </InputMask>
                                </Grid>
                                <Grid item md={12}>
                                    <InputMask
                                        mask="9999/99/99"
                                        value={this.state.birthday}
                                        onChange={this.handleChange}
                                    >
                                        {() => (
                                            <TextField
                                                required
                                                label="birthday"
                                                margin="normal"
                                                variant="outlined"
                                                id="outlined-birthday"
                                                name="birthday"
                                                value={this.state.birthday}
                                                fullWidth
                                                InputProps={{
                                                    className: classes.labelTxtField
                                                }}
                                            />
                                        )}
                                    </InputMask>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.edit} color="primary" variant="contained">
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
};

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
    editClient: (client) => dispatch(editClientAPI(client)),
});

const mapStateToProps = (state) => ({
    clients: state.clients.clients
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(EditClient));