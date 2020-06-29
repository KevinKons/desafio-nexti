import {
    CREATE_PRODUCT,
    LIST_PRODUCTS,
} from "../actions/products";

const INITIAL_STATE = {
    products: []
};

export const products = (state = INITIAL_STATE, action) => {
    const {product, products} = action;

    switch (action.type) {
        case CREATE_PRODUCT:
            return {
                ...state,
                products: state.products.push(product)
            };
        case LIST_PRODUCTS:
            return {
                ...state,
                products
            };
        default:
            return {
                ...state
            };
    }
};