import * as ClientsAPI from '../../util/ClientsAPI';

export const CREATE_CLIENT = 'CREATE_CLIENT';
export const LIST_CLIENTS = 'LIST_CLIENTS';
export const DELETE_CLIENT = 'DELETE_CLIENT';
export const EDIT_CLIENT = 'EDIT_CLIENT';

export const createClient = (client) => ({
    type: CREATE_CLIENT,
    client
});

export const createClientAPI = (client) => (dispatch) => (
    ClientsAPI
        .createClient(client)
        .then(dispatch(createClient(client)))
);

export const listClients = (clients) => ({
    type: LIST_CLIENTS,
    clients
});

export const listClientsAPI = () => dispatch => (
    ClientsAPI
        .listClients()
        .then(clients => dispatch(listClients(clients)))
);

export const deleteClient = (id) => ({
    type: DELETE_CLIENT,
    id: id
});

export const deleteClientAPI = (id) => dispatch => (
    ClientsAPI
        .deleteClient(id)
        .then(dispatch(deleteClient(id)))
);

export const editClient = (client) => ({
    type: EDIT_CLIENT,
    client
});

export const editClientAPI = (client) => dispatch => (
    ClientsAPI
        .editClient(client)
        .then(dispatch(editClient(client)))
);