import { Epic, combineEpics, ofType } from 'redux-observable'
import { of } from 'rxjs'
import { mergeMap, map } from 'rxjs/operators'
import { getRequests } from '../../../api'
import { IApplicationState } from '../../../store'
import {
    loadServerRequestsRequest,
    loadServerRequestsSuccess,
    RequestsAction,
    ILoadServerRequestsAction,
    ILoadServerRequestsRequestAction,
} from './actions'
import { IWiremockRequest } from '../types'
import { RequestsActionTypes } from './types'

export const shouldLoadServerRequestsEpic: Epic<RequestsAction, any, IApplicationState> = (action$, _state$) =>
    action$.pipe(
        ofType(RequestsActionTypes.LOAD_SERVER_REQUESTS),
        mergeMap(({ payload }: ILoadServerRequestsAction) => {
            return of(loadServerRequestsRequest(payload.server))
        })
    )

export const loadServerRequestsEpic: Epic<RequestsAction, any, IApplicationState> = (action$, _state$) =>
    action$.pipe(
        ofType(RequestsActionTypes.LOAD_SERVER_REQUESTS_REQUEST),
        mergeMap(({ payload }: ILoadServerRequestsRequestAction) =>
            getRequests(payload.server).pipe(
                map(({ requests }: { requests: IWiremockRequest[] }) =>
                    loadServerRequestsSuccess(payload.server, requests)
                )
            )
        )
    )

export const requestsEpic = combineEpics(
    shouldLoadServerRequestsEpic,
    loadServerRequestsEpic
)
