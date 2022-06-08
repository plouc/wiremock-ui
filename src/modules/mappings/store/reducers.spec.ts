import { IServer } from '../../servers'
import { IMapping } from '../types'
import { MappingsActionTypes } from './types'
import {
    loadServerMappingsRequest,
    loadServerMappingsSuccess,
    fetchMappingRequest,
    fetchMappingSuccess,
    initMappingWorkingCopy,
    syncMappingWorkingCopy,
    updateMappingRequest,
    updateMappingSuccess,
    deleteMappingRequest,
    deleteMappingSuccess,
} from './actions'
import {
    IMappingsState,
    mappingsReducer,
} from './reducers'

const testServer: IServer = {
    name: 'test_server',
    url: 'http://localhost',
    port: 8080,
    mappingsHaveBeenLoaded: false,
    isLoadingMappings: false,
    mappings: []
}

const testMapping: IMapping = {
    id: 'test_mapping_id',
    uuid: 'test_mapping_id',
    request: {
        method: 'GET',
    },
    response: {
        status: 200,
    },
    persistent: false
}

describe('mappingsReducer', () => {
    it(`should handle ${MappingsActionTypes.LOAD_SERVER_MAPPINGS_REQUEST} action`, () => {
        const initialState: IMappingsState = {}
        const state = mappingsReducer(
            initialState,
            loadServerMappingsRequest(testServer)
        )

        expect(state).toEqual({
            [testServer.name]: {
                isLoading: true,
                haveBeenLoaded: false,
                ids: [],
                byId: {},
                creations: {},
            },
        })
    })

    it(`should handle ${MappingsActionTypes.LOAD_SERVER_MAPPINGS_SUCCESS} action`, () => {
        const initialState: IMappingsState = {}
        const state = mappingsReducer(
            initialState,
            loadServerMappingsSuccess(testServer, [testMapping])
        )

        expect(state).toEqual({
            [testServer.name]: {
                isLoading: false,
                haveBeenLoaded: true,
                ids: [testMapping.id],
                byId: {
                    [testMapping.id]: {
                        mapping: testMapping,
                        isDeleting: false,
                        isFetching: false,
                        isUpdating: false,
                    },
                },
                creations: {},
            },
        })
    })

    it(`should handle ${MappingsActionTypes.FETCH_MAPPING_REQUEST} action`, () => {
        const initialState: IMappingsState = {
            [testServer.name]: {
                isLoading: false,
                haveBeenLoaded: true,
                ids: [testMapping.id],
                byId: {
                    [testMapping.id]: {
                        isDeleting: false,
                        isFetching: false,
                        isUpdating: false,
                    },
                },
                creations: {},
            },
        }
        const state = mappingsReducer(
            initialState,
            fetchMappingRequest(testServer.name, testMapping.id)
        )

        const mappingState = state[testServer.name].byId[testMapping.id]
        expect(mappingState.isFetching).toBeTruthy()
    })

    it(`should handle ${MappingsActionTypes.FETCH_MAPPING_SUCCESS} action`, () => {
        const initialState: IMappingsState = {
            [testServer.name]: {
                isLoading: false,
                haveBeenLoaded: true,
                ids: [testMapping.id],
                byId: {
                    [testMapping.id]: {
                        isDeleting: false,
                        isFetching: true,
                        isUpdating: false,
                    },
                },
                creations: {},
            },
        }
        const state = mappingsReducer(
            initialState,
            fetchMappingSuccess(testServer.name, testMapping.id, testMapping)
        )

        const mappingState = state[testServer.name].byId[testMapping.id]
        expect(mappingState.isFetching).toBeFalsy()
        expect(mappingState.mapping).toEqual(testMapping)
    })

    it(`should handle ${MappingsActionTypes.INIT_MAPPING_WORKING_COPY} action`, () => {
        const initialState: IMappingsState = {
            [testServer.name]: {
                isLoading: false,
                haveBeenLoaded: true,
                ids: [testMapping.id],
                byId: {
                    [testMapping.id]: {
                        mapping: testMapping,
                        isDeleting: false,
                        isFetching: false,
                        isUpdating: false,
                    },
                },
                creations: {},
            },
        }
        const state = mappingsReducer(
            initialState,
            initMappingWorkingCopy(testServer.name, testMapping.id)
        )

        const mappingState = state[testServer.name].byId[testMapping.id]
        expect(mappingState.workingCopy).toEqual(testMapping)
    })

    it(`should handle ${MappingsActionTypes.SYNC_MAPPING_WORKING_COPY} action`, () => {
        const initialState: IMappingsState = {
            [testServer.name]: {
                isLoading: false,
                haveBeenLoaded: true,
                ids: [testMapping.id],
                byId: {
                    [testMapping.id]: {
                        mapping: testMapping,
                        isDeleting: false,
                        isFetching: false,
                        isUpdating: false,
                    },
                },
                creations: {},
            },
        }
        const state = mappingsReducer(
            initialState,
            syncMappingWorkingCopy(testServer.name, testMapping.id, {
                ...testMapping,
                request: {
                    method: 'POST',
                },
            })
        )

        const mappingState = state[testServer.name].byId[testMapping.id]
        expect(mappingState.workingCopy).toEqual({
            ...testMapping,
            request: {
                method: 'POST',
            },
        })
    })

    it(`should handle ${MappingsActionTypes.UPDATE_MAPPING_REQUEST} action`, () => {
        const initialState: IMappingsState = {
            [testServer.name]: {
                isLoading: false,
                haveBeenLoaded: true,
                ids: [testMapping.id],
                byId: {
                    [testMapping.id]: {
                        mapping: testMapping,
                        isDeleting: false,
                        isFetching: false,
                        isUpdating: false,
                    },
                },
                creations: {},
            },
        }
        const state = mappingsReducer(
            initialState,
            updateMappingRequest(testServer.name, testMapping.id, {
                ...testMapping,
                request: {
                    method: 'POST',
                },
            })
        )

        const mappingState = state[testServer.name].byId[testMapping.id]
        expect(mappingState.isUpdating).toBeTruthy()
        expect(mappingState.mapping).toEqual(testMapping)
    })

    it(`should handle ${MappingsActionTypes.UPDATE_MAPPING_SUCCESS} action`, () => {
        const initialState: IMappingsState = {
            [testServer.name]: {
                isLoading: false,
                haveBeenLoaded: true,
                ids: [testMapping.id],
                byId: {
                    [testMapping.id]: {
                        mapping: testMapping,
                        isDeleting: false,
                        isFetching: false,
                        isUpdating: false,
                    },
                },
                creations: {},
            },
        }
        const state = mappingsReducer(
            initialState,
            updateMappingSuccess(testServer.name, testMapping.id, {
                ...testMapping,
                request: {
                    method: 'POST',
                },
            })
        )

        const mappingState = state[testServer.name].byId[testMapping.id]
        expect(mappingState.isUpdating).toBeFalsy()
        expect(mappingState.mapping).toEqual({
            ...testMapping,
            request: {
                method: 'POST',
            },
        })
    })

    it(`should handle ${MappingsActionTypes.DELETE_MAPPING_REQUEST} action`, () => {
        const initialState: IMappingsState = {
            [testServer.name]: {
                isLoading: false,
                haveBeenLoaded: true,
                ids: [testMapping.id],
                byId: {
                    [testMapping.id]: {
                        isDeleting: false,
                        isFetching: false,
                        isUpdating: false,
                    },
                },
                creations: {},
            },
        }
        const state = mappingsReducer(
            initialState,
            deleteMappingRequest(testServer.name, testMapping.id)
        )

        const mappingState = state[testServer.name].byId[testMapping.id]
        expect(mappingState.isDeleting).toBeTruthy()
    })

    it(`should handle ${MappingsActionTypes.DELETE_MAPPING_SUCCESS} action`, () => {
        const initialState: IMappingsState = {
            [testServer.name]: {
                isLoading: false,
                haveBeenLoaded: true,
                ids: [testMapping.id],
                byId: {
                    [testMapping.id]: {
                        isDeleting: false,
                        isFetching: false,
                        isUpdating: false,
                    },
                },
                creations: {},
            },
        }
        const state = mappingsReducer(
            initialState,
            deleteMappingSuccess(testServer.name, testMapping.id)
        )

        expect(state).toEqual({
            [testServer.name]: {
                isLoading: false,
                haveBeenLoaded: true,
                ids: [],
                byId: {},
                creations: {},
            },
        })
    })
})