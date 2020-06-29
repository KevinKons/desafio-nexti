import * as OrdersAPI from '../../util/OrdersAPI';

export const CREATE_ORDER = 'CREATE_ORDER';
export const LIST_ORDERS = 'LIST_ORDERS';

export const createOrder = (order) => ({
    type: CREATE_ORDER,
    order
});

export const createOrderAPI = (order) => (dispatch) => (
    OrdersAPI
        .createOrder(order)
        .then(dispatch(createOrder(order)))
);

export const listOrders = (orders) => ({
    type: LIST_ORDERS,
    orders
});

export const listOrdersAPI = () => dispatch => (
    OrdersAPI
        .listOrders()
        .then(orders => dispatch(listOrders(orders)))
);