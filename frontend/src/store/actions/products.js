import * as ProductsAPI from '../../util/ProductsAPI';

export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const LIST_PRODUCTS = 'LIST_PRODUCTS';

export const createProduct = (product) => ({
    type: CREATE_PRODUCT,
    product
});

export const createProductAPI = (product) => (dispatch) => (
    ProductsAPI
        .createProduct(product)
        .then(dispatch(createProduct(product)))
);

export const listProducts = (products) => ({
    type: LIST_PRODUCTS,
    products
});

export const listProductsAPI = () => dispatch => (
    ProductsAPI
        .listProducts()
        .then(products => dispatch(listProducts(products)))
);