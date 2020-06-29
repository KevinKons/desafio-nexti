import React, {Component} from 'react';
import { Link } from "react-router-dom";

import {
    withStyles,
    Grid,
    Divider,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from "@material-ui/core";

import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";


import {makeStyles} from "@material-ui/core/styles";

const useStyles = (theme) => ({
    root: {
        display: 'flex',
    },
    menu: {
        paddingTop: 30,
        marginBottom: 20,
    },
    link: {
        textDecoration: "none",
        color: "#fff"
    },
});

class LeftMenu extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Grid container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  className={classes.root}
                  spacing={2}
            >
                <Grid className={classes.menu}>
                    <Typography variant="h3">
                        Menu
                    </Typography>
                </Grid>

                <Divider />

                <List>
                    <Link to="/" className={classes.link}>
                        <ListItem button key={"0"}>
                            <ListItemText primary={"Clients"} />
                            <ListItemIcon>
                                <KeyboardArrowRight />
                            </ListItemIcon>
                        </ListItem>
                    </Link>
                    <Link to="/products" className={classes.link}>
                        <ListItem button key={"1"}>
                            <ListItemText primary={"Products"} />
                            <ListItemIcon>
                                <KeyboardArrowRight />
                            </ListItemIcon>
                        </ListItem>
                    </Link>
                    {/*<Link to="/pedidos" className={classes.link}>*/}
                        {/*<ListItem button key={"4"}>*/}
                            {/*<ListItemText primary={"Pedidos"} />*/}
                            {/*<ListItemIcon>*/}
                                {/*<KeyboardArrowRight />*/}
                            {/*</ListItemIcon>*/}
                        {/*</ListItem>*/}
                    {/*</Link>*/}
                </List>
            </Grid>
        )
    }
}

export default withStyles(useStyles)(LeftMenu);