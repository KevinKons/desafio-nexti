import React, { Component } from "react";

import { Switch, Route } from "react-router-dom";

import Clients from "./components/pages/Clients";
import Products from "./components/pages/Products";
import Orders from "./components/pages/Orders";

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Clients} />
                <Route path="/products" component={Products} />
                <Route path="/orders" component={Orders} />
            </Switch>
        );
    }
}

export default Routes;