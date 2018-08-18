import { Epic, combineEpics } from 'redux-observable'
import { of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { removeContentFromAllPanesAction } from 'edikit'
import { IApplicationState } from '../../../store'
import { ServersAction, ICreateServerAction } from './actions'
import { ServersActionTypes } from './types'

export const createServerEpic: Epic<ServersAction, any, IApplicationState> = action$ =>
    action$.ofType(ServersActionTypes.CREATE_SERVER)
        .pipe(
            mergeMap(({ payload }: ICreateServerAction) => of(
                removeContentFromAllPanesAction('default', 'server.create')
            ))
        )

export const serversEpic = combineEpics(
    createServerEpic
)
