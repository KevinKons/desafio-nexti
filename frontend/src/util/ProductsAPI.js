const api = 'http://localhost:8080/api/product';

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export const createProduct = (product) => {
    let response = fetch(api, {
        method: 'POST',
        body: JSON.stringify(product),
        headers,
    })
        .then(res => res.json())
        .then(data => data)
        .catch(error => error);

    return response;
};

export const listProducts = () => {
    let response = fetch(api, {headers})
        .then(res => res.json())
        .catch(() => []);

    return response;
};