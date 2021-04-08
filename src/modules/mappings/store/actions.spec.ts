import { IServer } from '../../servers'
import { IMapping } from '../types'
import { MappingsActionTypes } from './types'
import {
    loadServerMappings,
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
    persistent: false,
}

describe('loadServerMappings', () => {
    it('should return corresponding action', () => {
        expect(loadServerMappings(testServer)).toEqual({
            type: MappingsActionTypes.LOAD_SERVER_MAPPINGS,
            payload: {
                serverName: testServer.name,
                server: testServer,
            }
        })
    })
})

describe('loadServerMappingsRequest', () => {
    it('should return corresponding action', () => {
        expect(loadServerMappingsRequest(testServer)).toEqual({
            type: MappingsActionTypes.LOAD_SERVER_MAPPINGS_REQUEST,
            payload: {
                serverName: testServer.name,
                server: testServer,
            }
        })
    })
})

describe('loadServerMappingsSuccess', () => {
    it('should return corresponding action', () => {
        expect(loadServerMappingsSuccess(testServer, [])).toEqual({
            type: MappingsActionTypes.LOAD_SERVER_MAPPINGS_SUCCESS,
            payload: {
                serverName: testServer.name,
                server: testServer,
                mappings: [],
            }
        })
    })
})

describe('fetchMappingRequest', () => {
    it('should return corresponding action', () => {
        expect(fetchMappingRequest(testServer.name, testMapping.id)).toEqual({
            type: MappingsActionTypes.FETCH_MAPPING_REQUEST,
            payload: {
                serverName: testServer.name,
                mappingId: testMapping.id,
            }
        })
    })
})

describe('fetchMappingSuccess', () => {
    it('should return corresponding action', () => {
        expect(fetchMappingSuccess(testServer.name, testMapping.id, testMapping)).toEqual({
            type: MappingsActionTypes.FETCH_MAPPING_SUCCESS,
            payload: {
                serverName: testServer.name,
                mappingId: testMapping.id,
                mapping: testMapping,
            }
        })
    })
})

describe('initMappingWorkingCopy', () => {
    it('should return corresponding action', () => {
        expect(initMappingWorkingCopy(testServer.name, testMapping.id)).toEqual({
            type: MappingsActionTypes.INIT_MAPPING_WORKING_COPY,
            payload: {
                serverName: testServer.name,
                mappingId: testMapping.id,
            }
        })
    })
})

describe('syncMappingWorkingCopy', () => {
    it('should return corresponding action', () => {
        expect(syncMappingWorkingCopy(testServer.name, testMapping.id, testMapping)).toEqual({
            type: MappingsActionTypes.SYNC_MAPPING_WORKING_COPY,
            payload: {
                serverName: testServer.name,
                mappingId: testMapping.id,
                update: testMapping,
            }
        })
    })
})

describe('updateMappingRequest', () => {
    it('should return corresponding action', () => {
        expect(updateMappingRequest(testServer.name, testMapping.id, testMapping)).toEqual({
            type: MappingsActionTypes.UPDATE_MAPPING_REQUEST,
            payload: {
                serverName: testServer.name,
                mappingId: testMapping.id,
                mapping: testMapping,
            }
        })
    })
})

describe('updateMappingSuccess', () => {
    it('should return corresponding action', () => {
        expect(updateMappingSuccess(testServer.name, testMapping.id, testMapping)).toEqual({
            type: MappingsActionTypes.UPDATE_MAPPING_SUCCESS,
            payload: {
                serverName: testServer.name,
                mappingId: testMapping.id,
                mapping: testMapping,
            }
        })
    })
})

describe('deleteMappingRequest', () => {
    it('should return corresponding action', () => {
        expect(deleteMappingRequest(testServer.name, testMapping.id)).toEqual({
            type: MappingsActionTypes.DELETE_MAPPING_REQUEST,
            payload: {
                serverName: testServer.name,
                mappingId: testMapping.id,
            }
        })
    })
})

describe('deleteMappingSuccess', () => {
    it('should return corresponding action', () => {
        expect(deleteMappingSuccess(testServer.name, testMapping.id)).toEqual({
            type: MappingsActionTypes.DELETE_MAPPING_SUCCESS,
            payload: {
                serverName: testServer.name,
                mappingId: testMapping.id,
            }
        })
    })
})