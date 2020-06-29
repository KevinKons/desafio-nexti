import { combineReducers } from 'redux'
import { clients } from "./clients";
import { products } from "./products";
import { orders } from "./orders";

export default combineReducers({
    clients,
    products,
    orders
});