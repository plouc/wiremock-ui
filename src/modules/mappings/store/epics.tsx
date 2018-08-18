import * as React from 'react'
import { Epic, combineEpics } from 'redux-observable'
import { of, EMPTY, from, concat } from 'rxjs'
import { mergeMap, map, flatMap } from 'rxjs/operators'
import {
    removeContentFromAllPanesAction,
    triggerNotification,
} from 'edikit'
import {
    getMappings,
    getMapping,
    updateMapping,
    deleteMapping,
} from '../../../api'
import { IApplicationState } from '../../../store'
import { getMappingLabel } from '../dto'
import {
    loadServerMappingsRequest,
    loadServerMappingsSuccess,
    updateMappingSuccess,
    fetchMappingSuccess,
    deleteMappingSuccess,
    MappingsAction,
    ILoadServerMappingsRequestAction,
    ILoadServerMappingsAction,
    IFetchMappingRequestAction,
    IUpdateMappingRequestAction,
    IDeleteMappingRequestAction,
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

export const updateMappingEpic: Epic<MappingsAction, any, IApplicationState> = (action$, state$) =>
    action$.ofType(MappingsActionTypes.UPDATE_MAPPING_REQUEST)
        .pipe(
            flatMap(({ payload }: IUpdateMappingRequestAction) => {
                const server = state$.value.servers.servers.find(
                    s => s.name === payload.serverName
                )
                if (server === undefined) return EMPTY

                return concat(
                    updateMapping(server, payload.mapping).pipe(
                        map(({ response: mapping }) => updateMappingSuccess(
                            payload.serverName,
                            payload.mappingId,
                            mapping
                        ))
                    ),
                    of(triggerNotification({
                        type: 'success',
                        content: (
                            <div>
                                mapping <strong>{getMappingLabel(payload.mapping)}</strong> successfully saved
                            </div>
                        ),
                        ttl: 2000,
                    }))
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
    updateMappingEpic,
    deleteMappingEpic
)
