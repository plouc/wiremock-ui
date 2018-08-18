import { uniq, cloneDeep } from 'lodash'
import { MappingsActionTypes } from './types'
import { MappingsAction } from './actions'
import { IMapping } from '../types'

export interface IMappingState {
    mapping?: IMapping
    workingCopy?: IMapping
    isFetching: boolean
    isCreating: boolean
    isUpdating: boolean
    isDeleting: boolean
}

export interface IMappingsState {
    [serverName: string]: IServerMappingsState
}

export type IServerMappingsStateById = {
    [mappingId: string]: IMappingState
}

export interface IServerMappingsState {
    isLoading: boolean
    haveBeenLoaded: boolean
    ids: string[]
    byId: IServerMappingsStateById
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
    },
    action: MappingsAction
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
                        isCreating: false,
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
                    agg: IServerMappingsStateById,
                    mappingId: string
                ): IServerMappingsStateById => {
                    if (mappingId === action.payload.mappingId) return agg

                    return {
                        ...agg,
                        [mappingId]: state.byId[mappingId]
                    }
                }, {})
            }

        default:
            return state
    }
}

export const mappingsReducer = (
    state: IMappingsState = {},
    action: MappingsAction
): IMappingsState => {
    switch (action.type) {
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

