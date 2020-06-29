const api = 'http://localhost:8080/api/order';

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080'
};

export const createOrder = (order) => {
    let response = fetch(api, {
        method: 'POST',
        body: JSON.stringify(order),
        headers,
    })
        .then(res => res.json())
        .then(data => data)
        .catch(error => error);

    return response;
};

export const listOrders = () => {
    let response = fetch(api, {headers})
        .then(res => res.json())
        .catch(() => []);

    return response;
};