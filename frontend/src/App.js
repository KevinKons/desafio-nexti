import React from 'react';
import { Provider } from "react-redux";
import store from "./store";

import { CssBaseline, Drawer, Grid } from "@material-ui/core";
import LeftMenu from './components/LeftMenu/LeftMenu';
import { makeStyles } from "@material-ui/core/styles";

import Routes from "./routes";

export default function App() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Grid item xs={2}>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <LeftMenu/>
                </Drawer>
            </Grid>
            <main className={classes.content}>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={12} md={9}>
                        <Provider store={store}>
                            <Routes />
                        </Provider>
                    </Grid>
                </Grid>
            </main>
        </div>
    );
}

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    control: {
        padding: theme.spacing(2),
    },
    content: {
        display: 'flex',
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        paddingTop: 64
    }
}));

