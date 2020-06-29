import { combineReducers } from 'redux'
import { clients } from "./clients";
import { products } from "./products";

export default combineReducers({
    clients,
    products
});