import * as React from 'react'
import { action } from 'typesafe-actions'
import { IServer } from '../../servers'
import { IMapping } from '../types'
import { getMappingLabel } from '../dto'
import { MappingsActionTypes } from './types'

export interface ILoadServerMappingsAction {
    type: MappingsActionTypes.LOAD_SERVER_MAPPINGS
    payload: {
        serverName: string
        server: IServer
    }
}

export const loadServerMappings = (server: IServer): ILoadServerMappingsAction => action(
    MappingsActionTypes.LOAD_SERVER_MAPPINGS,
    {
        serverName: server.name,
        server,
    }
)

export interface ILoadServerMappingsRequestAction {
    type: MappingsActionTypes.LOAD_SERVER_MAPPINGS_REQUEST
    payload: {
        serverName: string
        server: IServer
    }
}

export const loadServerMappingsRequest = (server: IServer): ILoadServerMappingsRequestAction => action(
    MappingsActionTypes.LOAD_SERVER_MAPPINGS_REQUEST,
    {
        serverName: server.name,
        server,
    }
)

export interface ILoadServerMappingsSuccessAction {
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
): ILoadServerMappingsSuccessAction => action(
    MappingsActionTypes.LOAD_SERVER_MAPPINGS_SUCCESS,
    {
        serverName: server.name,
        server,
        mappings,
    }
)

export interface IFetchMappingRequestAction {
    type: MappingsActionTypes.FETCH_MAPPING_REQUEST
    payload: {
        serverName: string
        mappingId: string
    }
}

export const fetchMappingRequest = (
    serverName: string,
    mappingId: string
): IFetchMappingRequestAction => action(
    MappingsActionTypes.FETCH_MAPPING_REQUEST,
    {
        serverName,
        mappingId,
    }
)

export interface IFetchMappingSuccessAction {
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
): IFetchMappingSuccessAction => action(
    MappingsActionTypes.FETCH_MAPPING_SUCCESS,
    {
        serverName,
        mappingId,
        mapping,
    }
)

export interface IInitMappingWorkingCopyAction {
    type: MappingsActionTypes.INIT_MAPPING_WORKING_COPY
    payload: {
        serverName: string
        mappingId: string
    }
}

export const initMappingWorkingCopy = (
    serverName: string,
    mappingId: string
): IInitMappingWorkingCopyAction => action(
    MappingsActionTypes.INIT_MAPPING_WORKING_COPY,
    {
        serverName,
        mappingId,
    }
)

export interface ISyncMappingWorkingCopyAction {
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
): ISyncMappingWorkingCopyAction => action(
    MappingsActionTypes.SYNC_MAPPING_WORKING_COPY,
    {
        serverName,
        mappingId,
        update,
    }
)

export interface IUpdateMappingRequestAction {
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
): IUpdateMappingRequestAction => action(
    MappingsActionTypes.UPDATE_MAPPING_REQUEST,
    {
        serverName,
        mappingId,
        mapping,
    }
)

export interface IUpdateMappingSuccessAction {
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
): IUpdateMappingSuccessAction => action(
    MappingsActionTypes.UPDATE_MAPPING_SUCCESS,
    {
        serverName,
        mappingId,
        mapping,
    },
    {
        notification: {
            type: 'success',
            content: (
                <div>
                    mapping <strong>{getMappingLabel(mapping)}</strong> successfully saved
                </div>
            ),
            ttl: 2000,
        },
    }
)

export interface IDeleteMappingRequestAction {
    type: MappingsActionTypes.DELETE_MAPPING_REQUEST
    payload: {
        serverName: string
        mappingId: string
    }
}

export const deleteMappingRequest = (
    serverName: string,
    mappingId: string
): IDeleteMappingRequestAction => action(
    MappingsActionTypes.DELETE_MAPPING_REQUEST,
    {
        serverName,
        mappingId,
    }
)

export interface IDeleteMappingSuccessAction {
    type: MappingsActionTypes.DELETE_MAPPING_SUCCESS
    payload: {
        serverName: string
        mappingId: string
    }
}

export const deleteMappingSuccess = (
    serverName: string,
    mappingId: string
): IDeleteMappingSuccessAction => action(
    MappingsActionTypes.DELETE_MAPPING_SUCCESS,
    {
        serverName,
        mappingId,
    },
    {
        notification: {
            type: 'success',
            content: (
                <div>
                    mapping successfully deleted
                </div>
            ),
            ttl: 2000,
        },
    }
)

export interface IInitCreateMappingAction {
    type: MappingsActionTypes.INIT_CREATE_MAPPING
    payload: {
        serverName: string
        creationId: string
        mapping: IMapping
    }
}

export const initCreateMapping = (
    serverName: string,
    creationId: string
): IInitCreateMappingAction => action(
    MappingsActionTypes.INIT_CREATE_MAPPING,
    {
        serverName,
        creationId,
        mapping: {
            id: creationId,
            uuid: creationId,
            request: {
                method: 'GET' as 'GET',
            },
            response: {
                status: 200,
            },
            persistent: false
        }
    }
)

export interface ICreateMappingRequestAction {
    type: MappingsActionTypes.CREATE_MAPPING_REQUEST
    payload: {
        serverName: string
        creationId: string
        mapping: IMapping
    }
}

export const createMappingRequest = (
    serverName: string,
    creationId: string,
    mapping: IMapping
): ICreateMappingRequestAction => action(
    MappingsActionTypes.CREATE_MAPPING_REQUEST,
    {
        serverName,
        creationId,
        mapping,
    }
)

export interface ICreateMappingSuccessAction {
    type: MappingsActionTypes.CREATE_MAPPING_SUCCESS
    payload: {
        serverName: string
        mappingId: string
        creationId: string
        mapping: IMapping
    }
}

export const createMappingSuccess = (
    serverName: string,
    mappingId: string,
    creationId: string,
    mapping: IMapping
): ICreateMappingSuccessAction => action(
    MappingsActionTypes.CREATE_MAPPING_SUCCESS,
    {
        serverName,
        mappingId,
        creationId,
        mapping,
    },
    {
        notification: {
            type: 'success',
            content: (
                <div>
                    mapping <strong>{getMappingLabel(mapping)}</strong> successfully created
                </div>
            ),
            ttl: 2000,
        },
    }
)

export interface ICancelMappingCreationAction {
    type: MappingsActionTypes.CANCEL_CREATE_MAPPING
    payload: {
        serverName: string
        creationId: string
    }
}

export const cancelMappingCreation = (
    serverName: string,
    creationId: string
): ICancelMappingCreationAction => action(
    MappingsActionTypes.CANCEL_CREATE_MAPPING,
    {
        serverName,
        creationId,
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
    | IInitCreateMappingAction
    | ICreateMappingRequestAction
    | ICreateMappingSuccessAction
    | ICancelMappingCreationAction