import React, { Component } from "react";

import { Switch, Route } from "react-router-dom";

import Clients from "./components/pages/Clients";
import Products from "./components/pages/Products";
// import Produtos from "./components/pages/Produtos";
// import Pedidos from "./components/pages/Pedidos";

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Clients} />
                <Route path="/products" component={Products} />
                {/*<Route path="/clientes" component={Clientes} />*/}
                {/*<Route path="/pedidos" component={Pedidos} />*/}
            </Switch>
        );
    }
}

export default Routes;