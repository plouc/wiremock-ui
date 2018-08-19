import { uniq, cloneDeep } from 'lodash'
import { ServersAction, ServersActionTypes, IServer } from '../../servers'
import { MappingsActionTypes } from './types'
import { MappingsAction } from './actions'
import { IMapping } from '../types'

export interface IMappingState {
    mapping?: IMapping
    workingCopy?: IMapping
    isFetching: boolean
    isUpdating: boolean
    isDeleting: boolean
}

export interface IMappingCreationState {
    id: string
    mapping: IMapping
    isCreating: boolean
}

export interface IMappingsState {
    [serverName: string]: IServerMappingsState
}

export interface IServerMappingsState {
    isLoading: boolean
    haveBeenLoaded: boolean
    ids: string[]
    byId: {
        [mappingId: string]: IMappingState
    }
    creations: {
        [creationId: string]: IMappingCreationState
    }
}

export const mappingReducer = (
    state: IMappingState,
    action: MappingsAction
): IMappingState => {
    switch (action.type) {
        case MappingsActionTypes.FETCH_MAPPING_REQUEST:
            return {
                ...state,
                isFetching: true,
            }

        case MappingsActionTypes.FETCH_MAPPING_SUCCESS:
            return {
                ...state,
                isFetching: false,
                mapping: action.payload.mapping,
            }

        case  MappingsActionTypes.INIT_MAPPING_WORKING_COPY:
            return {
                ...state,
                workingCopy: cloneDeep(state.mapping),
            }

        case MappingsActionTypes.SYNC_MAPPING_WORKING_COPY:
            return {
                ...state,
                workingCopy: { ...action.payload.update },
            }

        case MappingsActionTypes.UPDATE_MAPPING_REQUEST:
            return {
                ...state,
                isUpdating: true,
            }

        case MappingsActionTypes.UPDATE_MAPPING_SUCCESS:
            return {
                ...state,
                isUpdating: false,
                mapping: action.payload.mapping,
            }


        case MappingsActionTypes.DELETE_MAPPING_REQUEST:
            return {
                ...state,
                isDeleting: true,
            }

        case MappingsActionTypes.CREATE_MAPPING_SUCCESS:
            return {
                mapping: action.payload.mapping,
                isFetching: false,
                isUpdating: false,
                isDeleting: false,
            }

        default:
            return state
    }
}

export const mappingCreationReducer = (
    state: IMappingCreationState,
    action: MappingsAction
): IMappingCreationState => {
    switch (action.type) {
        case MappingsActionTypes.INIT_CREATE_MAPPING:
            if (state !== undefined) return state
            return {
                id: action.payload.creationId,
                isCreating: false,
                mapping: action.payload.mapping,
            }

        case MappingsActionTypes.CREATE_MAPPING_REQUEST:
            return {
                ...state,
                isCreating: true,
                mapping: action.payload.mapping,
            }

        case MappingsActionTypes.CREATE_MAPPING_SUCCESS:
            return {
                ...state,
                isCreating: false,
                mapping: action.payload.mapping,
            }

        default:
            return state
    }
}

export const mappingsByServerReducer = (
    state: IServerMappingsState = {
        isLoading: false,
        haveBeenLoaded: false,
        ids: [],
        byId: {},
        creations: {},
    },
    action: MappingsAction | ServersAction
): IServerMappingsState => {
    switch (action.type) {
        case MappingsActionTypes.LOAD_SERVER_MAPPINGS_REQUEST:
            return {
                ...state,
                isLoading: true,
                haveBeenLoaded: false,
            }

        case MappingsActionTypes.LOAD_SERVER_MAPPINGS_SUCCESS:
            const { mappings } = action.payload

            return {
                ...state,
                isLoading: false,
                haveBeenLoaded: true,
                ids: uniq(mappings.map(({ id }) => id)),
                byId: mappings.reduce((agg: { [mappingId: string]: IMappingState }, mapping: IMapping): { [mappingId: string]: IMappingState } => ({
                    ...agg,
                    [mapping.id]: {
                        mapping,
                        isFetching: false,
                        isUpdating: false,
                        isDeleting: false,
                    }
                }), {}),
            }

        case MappingsActionTypes.FETCH_MAPPING_REQUEST:
        case MappingsActionTypes.FETCH_MAPPING_SUCCESS:
        case MappingsActionTypes.INIT_MAPPING_WORKING_COPY:
        case MappingsActionTypes.SYNC_MAPPING_WORKING_COPY:
        case MappingsActionTypes.UPDATE_MAPPING_REQUEST:
        case MappingsActionTypes.UPDATE_MAPPING_SUCCESS:
        case MappingsActionTypes.DELETE_MAPPING_REQUEST:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.mappingId]: mappingReducer(
                        state.byId[action.payload.mappingId],
                        action
                    )
                }
            }

        case MappingsActionTypes.DELETE_MAPPING_SUCCESS:
            return {
                ...state,
                ids: state.ids.filter(id => id !== action.payload.mappingId),
                byId: Object.keys(state.byId).reduce((
                    agg: { [mappingId: string]: IMappingState },
                    mappingId: string
                ): { [mappingId: string]: IMappingState } => {
                    if (mappingId === action.payload.mappingId) return agg

                    return {
                        ...agg,
                        [mappingId]: state.byId[mappingId]
                    }
                }, {})
            }

        case MappingsActionTypes.INIT_CREATE_MAPPING:
        case MappingsActionTypes.CREATE_MAPPING_REQUEST:
        case MappingsActionTypes.CANCEL_CREATE_MAPPING:
            return {
                ...state,
                creations: {
                    ...state.creations,
                    [action.payload.creationId]: mappingCreationReducer(
                        state.creations[action.payload.creationId],
                        action
                    )
                }
            }

        case MappingsActionTypes.CREATE_MAPPING_SUCCESS:
            return {
                ...state,
                ids: [action.payload.mappingId, ...state.ids],
                byId: {
                    ...state.byId,
                    [action.payload.mappingId]: mappingReducer(
                        state.byId[action.payload.mappingId],
                        action
                    )
                },
                creations: Object.keys(state.creations).reduce((
                    agg: { [creationId: string]: IMappingCreationState },
                    creationId: string
                ): { [creationId: string]: IMappingCreationState } => {
                    if (creationId === action.payload.creationId) return agg

                    return {
                        ...agg,
                        [creationId]: state.creations[creationId]
                    }
                }, {})
            }

        default:
            return state
    }
}

export const mappingsReducer = (
    state: IMappingsState = {},
    action: MappingsAction | ServersAction
): IMappingsState => {
    switch (action.type) {
        case ServersActionTypes.INIT_SERVERS:
            return action.payload.servers.reduce((agg: IMappingsState, server: IServer) => ({
                ...agg,
                [server.name]: {
                    isLoading: false,
                    haveBeenLoaded: false,
                    ids: [],
                    byId: {},
                    creations: {},
                },
            }), {})

        case ServersActionTypes.CREATE_SERVER:
            return {
                ...state,
                [action.payload.server.name]: mappingsByServerReducer(
                    undefined,
                    action
                )
            }

        case MappingsActionTypes.LOAD_SERVER_MAPPINGS_REQUEST:
        case MappingsActionTypes.LOAD_SERVER_MAPPINGS_SUCCESS:
        case MappingsActionTypes.FETCH_MAPPING_REQUEST:
        case MappingsActionTypes.FETCH_MAPPING_SUCCESS:
        case MappingsActionTypes.INIT_MAPPING_WORKING_COPY:
        case MappingsActionTypes.SYNC_MAPPING_WORKING_COPY:
        case MappingsActionTypes.UPDATE_MAPPING_REQUEST:
        case MappingsActionTypes.UPDATE_MAPPING_SUCCESS:
        case MappingsActionTypes.DELETE_MAPPING_REQUEST:
        case MappingsActionTypes.DELETE_MAPPING_SUCCESS:
        case MappingsActionTypes.INIT_CREATE_MAPPING:
        case MappingsActionTypes.CREATE_MAPPING_REQUEST:
        case MappingsActionTypes.CREATE_MAPPING_SUCCESS:
        case MappingsActionTypes.CANCEL_CREATE_MAPPING:
            return {
                ...state,
                [action.payload.serverName]: mappingsByServerReducer(
                    state[action.payload.serverName],
                    action
                )
            }

        default:
            return state
    }
}

