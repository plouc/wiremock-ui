import { action } from 'typesafe-actions'
import { IServer } from '../../servers'
import { IWiremockRequest } from '../types'
import { RequestsActionTypes } from './types'

export interface ILoadServerRequestsAction {
    type: RequestsActionTypes.LOAD_SERVER_REQUESTS
    payload: {
        serverName: string
        server: IServer
    }
}

export const loadServerRequests = (server: IServer): ILoadServerRequestsAction => action(
    RequestsActionTypes.LOAD_SERVER_REQUESTS,
    {
        serverName: server.name,
        server,
    }
)

export interface ILoadServerRequestsRequestAction {
    type: RequestsActionTypes.LOAD_SERVER_REQUESTS_REQUEST
    payload: {
        serverName: string
        server: IServer
    }
}

export const loadServerRequestsRequest = (server: IServer): ILoadServerRequestsRequestAction => action(
    RequestsActionTypes.LOAD_SERVER_REQUESTS_REQUEST,
    {
        serverName: server.name,
        server,
    }
)

export interface ILoadServerRequestsSuccessAction {
    type: RequestsActionTypes.LOAD_SERVER_REQUESTS_SUCCESS
    payload: {
        serverName: string
        server: IServer
        requests: IWiremockRequest[]
    }
}

export const loadServerRequestsSuccess = (
    server: IServer,
    requests: IWiremockRequest[]
): ILoadServerRequestsSuccessAction => action(
    RequestsActionTypes.LOAD_SERVER_REQUESTS_SUCCESS,
    {
        serverName: server.name,
        server,
        requests,
    }
)

export interface ISelectRequestAction {
    type: RequestsActionTypes.SELECT_REQUEST
    payload: {
        serverName: string
        request: IWiremockRequest
    }
}

export const selectRequest = (
    serverName: string,
    request: IWiremockRequest
): ISelectRequestAction => action(
    RequestsActionTypes.SELECT_REQUEST,
    { serverName, request }
)

export interface ICloseRequestDetailAction {
    type: RequestsActionTypes.CLOSE_REQUEST_DETAIL
    payload: {
        serverName: string
    }
}

export const closeRequestDetail = (serverName: string): ICloseRequestDetailAction => action(
    RequestsActionTypes.CLOSE_REQUEST_DETAIL,
    { serverName }
)

export type RequestsAction =
    | ILoadServerRequestsAction
    | ILoadServerRequestsRequestAction
    | ILoadServerRequestsSuccessAction
    | ISelectRequestAction
    | ICloseRequestDetailAction
