import {
    CREATE_CLIENT,
    LIST_CLIENTS,
    DELETE_CLIENT,
    EDIT_CLIENT
} from "../actions/clients";

const INITIAL_STATE = {
    clients: []
};

export const clients = (state = INITIAL_STATE, action) => {
    const {client, clients, id} = action;

    switch (action.type) {
        case CREATE_CLIENT:
            return {
                ...state,
                clients: state.clients.push(client)
            };
        case LIST_CLIENTS:
            return {
                ...state,
                clients
            };
        case DELETE_CLIENT:
            return {
              ...state,
              clients: state.clients.filter(client => client.id !== id)
            };
        case EDIT_CLIENT:
            return {
                ...state,
                clients: state.clients.map(c => {
                    if(c.id === client.id) {
                        return client;
                    }
                    return c;
                })
            };
        default:
            return {
                ...state
            };
    }
};