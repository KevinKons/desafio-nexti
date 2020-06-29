const api = 'http://localhost:8080/api/client';

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080',
};

export const createClient = (client) => {
    let response = fetch(api, {
        method: 'POST',
        body: JSON.stringify(client),
        headers,
    })
        .then(res => res.json())
        .then(data => data)
        .catch(error => error);

    return response;
};

export const listClients = () => {
    let response = fetch(api, {headers})
        .then(res => res.json())
        .catch(() => []);

    return response;
};

export const deleteClient = (id) => {
    let response = fetch(`${api}/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => data)
        .catch(error => error);

    return response;
};

export const editClient = client => {
    let response = fetch(api, {
        headers,
        method: "PUT",
        body: JSON.stringify(client)
    })
        .then(res => res.json())
        .catch(error => console.log(error));

    return response;
};