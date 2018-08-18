import { action } from 'typesafe-actions'
import { IAction } from '../../../store'
import { IServer } from '../../servers'
import { IMapping } from '../types'
import { MappingsActionTypes } from './types'

export interface ILoadServerMappingsAction extends IAction {
    type: MappingsActionTypes.LOAD_SERVER_MAPPINGS
    payload: {
        serverName: string
        server: IServer
    }
}

export const loadServerMappings = (server: IServer) => action(
    MappingsActionTypes.LOAD_SERVER_MAPPINGS,
    {
        serverName: server.name,
        server,
    }
)

export interface ILoadServerMappingsRequestAction extends IAction {
    type: MappingsActionTypes.LOAD_SERVER_MAPPINGS_REQUEST
    payload: {
        serverName: string
        server: IServer
    }
}

export const loadServerMappingsRequest = (server: IServer) => action(
    MappingsActionTypes.LOAD_SERVER_MAPPINGS_REQUEST,
    {
        serverName: server.name,
        server,
    }
)

export interface ILoadServerMappingsSuccessAction extends IAction {
    type: MappingsActionTypes.LOAD_SERVER_MAPPINGS_SUCCESS
    payload: {
        serverName: string
        server: IServer
        mappings: IMapping[]
    }
}

export const loadServerMappingsSuccess = (
    server: IServer,
    mappings: IMapping[]
) => action(
    MappingsActionTypes.LOAD_SERVER_MAPPINGS_SUCCESS,
    {
        serverName: server.name,
        server,
        mappings,
    }
)

export interface IFetchMappingRequestAction extends IAction {
    type: MappingsActionTypes.FETCH_MAPPING_REQUEST
    payload: {
        serverName: string
        mappingId: string
    }
}

export const fetchMappingRequest = (
    serverName: string,
    mappingId: string
) => action(
    MappingsActionTypes.FETCH_MAPPING_REQUEST,
    {
        serverName,
        mappingId,
    }
)

export interface IFetchMappingSuccessAction extends IAction {
    type: MappingsActionTypes.FETCH_MAPPING_SUCCESS
    payload: {
        serverName: string
        mappingId: string
        mapping: IMapping
    }
}

export const fetchMappingSuccess = (
    serverName: string,
    mappingId: string,
    mapping: IMapping
) => action(
    MappingsActionTypes.FETCH_MAPPING_SUCCESS,
    {
        serverName,
        mappingId,
        mapping,
    }
)









export interface IInitMappingWorkingCopyAction extends IAction {
    type: MappingsActionTypes.INIT_MAPPING_WORKING_COPY
    payload: {
        serverName: string
        mappingId: string
    }
}

export const initMappingWorkingCopy = (
    serverName: string,
    mappingId: string
) => action(
    MappingsActionTypes.INIT_MAPPING_WORKING_COPY,
    {
        serverName,
        mappingId,
    }
)

export interface ISyncMappingWorkingCopyAction extends IAction {
    type: MappingsActionTypes.SYNC_MAPPING_WORKING_COPY
    payload: {
        serverName: string
        mappingId: string
        update: IMapping
    }
}

export const syncMappingWorkingCopy = (
    serverName: string,
    mappingId: string,
    update: IMapping
) => action(
    MappingsActionTypes.SYNC_MAPPING_WORKING_COPY,
    {
        serverName,
        mappingId,
        update,
    }
)

export interface IUpdateMappingRequestAction extends IAction {
    type: MappingsActionTypes.UPDATE_MAPPING_REQUEST
    payload: {
        serverName: string
        mappingId: string
        mapping: IMapping
    }
}

export const updateMappingRequest = (
    serverName: string,
    mappingId: string,
    mapping: IMapping
) => action(
    MappingsActionTypes.UPDATE_MAPPING_REQUEST,
    {
        serverName,
        mappingId,
        mapping,
    }
)

export interface IUpdateMappingSuccessAction extends IAction {
    type: MappingsActionTypes.UPDATE_MAPPING_SUCCESS
    payload: {
        serverName: string
        mappingId: string
        mapping: IMapping
    }
}

export const updateMappingSuccess = (
    serverName: string,
    mappingId: string,
    mapping: IMapping
) => action(
    MappingsActionTypes.UPDATE_MAPPING_SUCCESS,
    {
        serverName,
        mappingId,
        mapping,
    }
)

export interface IDeleteMappingRequestAction extends IAction {
    type: MappingsActionTypes.DELETE_MAPPING_REQUEST
    payload: {
        serverName: string
        mappingId: string
    }
}

export const deleteMappingRequest = (
    serverName: string,
    mappingId: string
) => action(
    MappingsActionTypes.DELETE_MAPPING_REQUEST,
    {
        serverName,
        mappingId,
    }
)

export interface IDeleteMappingSuccessAction extends IAction {
    type: MappingsActionTypes.DELETE_MAPPING_SUCCESS
    payload: {
        serverName: string
        mappingId: string
    }
}

export const deleteMappingSuccess = (
    serverName: string,
    mappingId: string
) => action(
    MappingsActionTypes.DELETE_MAPPING_SUCCESS,
    {
        serverName,
        mappingId,
    }
)

export type MappingsAction =
    | ILoadServerMappingsAction
    | ILoadServerMappingsRequestAction
    | ILoadServerMappingsSuccessAction
    | IFetchMappingRequestAction
    | IFetchMappingSuccessAction
    | IInitMappingWorkingCopyAction
    | ISyncMappingWorkingCopyAction
    | IUpdateMappingRequestAction
    | IUpdateMappingSuccessAction
    | IDeleteMappingRequestAction
    | IDeleteMappingSuccessAction