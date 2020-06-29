import {
    CREATE_ORDER,
    LIST_ORDERS,
} from "../actions/orders";

const INITIAL_STATE = {
    orders: []
};

export const orders = (state = INITIAL_STATE, action) => {
    const { order, orders } = action;

    console.log(order)

    switch (action.type) {
        case CREATE_ORDER:
            return {
                ...state,
                orders: state.orders.push(order)
            };
        case LIST_ORDERS:
            return {
                ...state,
                orders
            };
        default:
            return {
                ...state
            };
    }
};