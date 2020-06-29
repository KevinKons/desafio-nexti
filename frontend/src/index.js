import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from "react-router-dom";
import history from "./history";


import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const theme = createMuiTheme({
    palette: {
        type: "dark",
        typografy: {
            useNextVariants: true
        }
    }
});

ReactDOM.render(
    <React.StrictMode>
        <MuiThemeProvider theme={theme}>
            <Router history={history}>
                <App/>
            </Router>
        </MuiThemeProvider>,
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
