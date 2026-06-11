import { ServersAction, ServersActionTypes } from '../../servers'
import { RequestsActionTypes } from './types'
import { RequestsAction } from './actions'
import { IWiremockRequest } from '../types'

export interface IServerRequestsState {
    isLoading: boolean
    haveBeenLoaded: boolean
    requests: IWiremockRequest[]
    selectedRequest?: IWiremockRequest
}

export interface IRequestsState {
    [serverName: string]: IServerRequestsState
}

const initialServerState: IServerRequestsState = {
    isLoading: false,
    haveBeenLoaded: false,
    requests: [],
    selectedRequest: undefined,
}

export const requestsReducer = (
    state: IRequestsState = {},
    action: RequestsAction | ServersAction
): IRequestsState => {
    switch (action.type) {
        case ServersActionTypes.CREATE_SERVER:
            return {
                ...state,
                [action.payload.server.name]: { ...initialServerState },
            }

        case RequestsActionTypes.LOAD_SERVER_REQUESTS_REQUEST:
            return {
                ...state,
                [action.payload.serverName]: {
                    ...(state[action.payload.serverName] || initialServerState),
                    isLoading: true,
                },
            }

        case RequestsActionTypes.LOAD_SERVER_REQUESTS_SUCCESS:
            return {
                ...state,
                [action.payload.serverName]: {
                    ...(state[action.payload.serverName] || initialServerState),
                    isLoading: false,
                    haveBeenLoaded: true,
                    requests: action.payload.requests,
                },
            }

        case RequestsActionTypes.SELECT_REQUEST:
            return {
                ...state,
                [action.payload.serverName]: {
                    ...state[action.payload.serverName],
                    selectedRequest: action.payload.request,
                },
            }

        case RequestsActionTypes.CLOSE_REQUEST_DETAIL:
            return {
                ...state,
                [action.payload.serverName]: {
                    ...state[action.payload.serverName],
                    selectedRequest: undefined,
                },
            }

        default:
            return state
    }
}
