import { Epic, combineEpics } from 'redux-observable'
import { of, EMPTY, from } from 'rxjs'
import { mergeMap, map, flatMap } from 'rxjs/operators'
import { omit } from 'lodash'
import { removeContentFromAllPanesAction, addContentToCurrentPaneAction } from 'edikit'
import {
    getMappings,
    getMapping,
    createMapping,
    updateMapping,
    deleteMapping,
} from '../../../api'
import { IApplicationState } from '../../../store'
import {
    loadServerMappingsRequest,
    loadServerMappingsSuccess,
    createMappingSuccess,
    updateMappingSuccess,
    fetchMappingSuccess,
    deleteMappingSuccess,
    MappingsAction,
    ILoadServerMappingsRequestAction,
    ILoadServerMappingsAction,
    IFetchMappingRequestAction,
    IUpdateMappingRequestAction,
    IDeleteMappingRequestAction,
    ICreateMappingRequestAction,
} from './actions'
import { IMapping } from '../types'
import { MappingsActionTypes } from './types'

export const shouldLoadServerMappingsEpic: Epic<MappingsAction, any, IApplicationState> = (action$, state$) =>
    action$.ofType(MappingsActionTypes.LOAD_SERVER_MAPPINGS)
        .pipe(
            mergeMap(({ payload }: ILoadServerMappingsAction) => {
                const serversMappings = state$.value.mappings
                const entry = serversMappings[payload.server.name]
                if (entry !== undefined) {
                    if (entry.isLoading || entry.haveBeenLoaded) {
                        return EMPTY
                    }
                }

                return of(loadServerMappingsRequest(payload.server))
            })
        )

export const loadServerMappingsEpic: Epic<MappingsAction, any, IApplicationState> = (action$, state$) =>
    action$.ofType(MappingsActionTypes.LOAD_SERVER_MAPPINGS_REQUEST)
        .pipe(
            mergeMap(({ payload }: ILoadServerMappingsRequestAction) =>
                getMappings(payload.server).pipe(
                    map(({ mappings }) => loadServerMappingsSuccess(
                        payload.server,
                        mappings
                    ))
                )
            )
        )

export const fetchMappingsEpic: Epic<MappingsAction, any, IApplicationState> = (action$, state$) =>
    action$.ofType(MappingsActionTypes.FETCH_MAPPING_REQUEST)
        .pipe(
            mergeMap(({ payload }: IFetchMappingRequestAction) => {
                const server = state$.value.servers.servers.find(
                    s => s.name === payload.serverName
                )
                if (server === undefined) return EMPTY

                return getMapping(server, payload.mappingId).pipe(
                    map((mapping: IMapping) => fetchMappingSuccess(
                        payload.serverName,
                        payload.mappingId,
                        mapping
                    ))
                )
            })
        )

export const createMappingEpic: Epic<MappingsAction, any, IApplicationState> = (action$, state$) =>
    action$.ofType(MappingsActionTypes.CREATE_MAPPING_REQUEST)
        .pipe(
            flatMap(({ payload }: ICreateMappingRequestAction) => {
                const server = state$.value.servers.servers.find(
                    s => s.name === payload.serverName
                )
                if (server === undefined) return EMPTY

                return createMapping(server, omit(payload.mapping, ['id', 'uuid'])).pipe(
                    mergeMap(({ response: mapping }) => from([
                        removeContentFromAllPanesAction(
                            'default',
                            `${server.name}.mapping.create.${payload.creationId}`,
                        ),
                        createMappingSuccess(
                            payload.serverName,
                            mapping.id,
                            payload.creationId,
                            mapping
                        ),
                        addContentToCurrentPaneAction(
                            'default',
                            {
                                id: mapping.id,
                                type: 'mapping',
                                isCurrent: true,
                                isUnique: false,
                                data: {
                                    serverName: server.name,
                                    mappingId: mapping.id,
                                },
                            }
                        ),
                    ]))
                )
            })
        )

export const updateMappingEpic: Epic<MappingsAction, any, IApplicationState> = (action$, state$) =>
    action$.ofType(MappingsActionTypes.UPDATE_MAPPING_REQUEST)
        .pipe(
            flatMap(({ payload }: IUpdateMappingRequestAction) => {
                const server = state$.value.servers.servers.find(
                    s => s.name === payload.serverName
                )
                if (server === undefined) return EMPTY

                return updateMapping(server, payload.mapping).pipe(
                    map(({ response: mapping }) => updateMappingSuccess(
                        payload.serverName,
                        payload.mappingId,
                        mapping
                    ))
                )
            })
        )

export const deleteMappingEpic: Epic<MappingsAction, any, IApplicationState> = (action$, state$) =>
    action$.ofType(MappingsActionTypes.DELETE_MAPPING_REQUEST)
        .pipe(
            mergeMap(({ payload }: IDeleteMappingRequestAction) => {
                const server = state$.value.servers.servers.find(
                    s => s.name === payload.serverName
                )
                if (server === undefined) return EMPTY

                return deleteMapping(server, payload.mappingId).pipe(
                    mergeMap(() => from([
                        removeContentFromAllPanesAction(
                            'default',
                            payload.mappingId,
                        ),
                        deleteMappingSuccess(
                            payload.serverName,
                            payload.mappingId
                        ),
                    ]))
                )
            })
        )

export const mappingsEpic = combineEpics(
    shouldLoadServerMappingsEpic,
    loadServerMappingsEpic,
    fetchMappingsEpic,
    createMappingEpic,
    updateMappingEpic,
    deleteMappingEpic
)
