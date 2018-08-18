import * as React from 'react'
import { Epic, combineEpics } from 'redux-observable'
import { of, concat } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { triggerNotification, removeContentFromAllPanesAction } from 'edikit'
import { IApplicationState } from '../../../store'
import { ServersAction, ICreateServerAction } from './actions'
import { ServersActionTypes } from './types'

export const createServerEpic: Epic<ServersAction, any, IApplicationState> = action$ =>
    action$.ofType(ServersActionTypes.CREATE_SERVER)
        .pipe(
            mergeMap(({ payload }: ICreateServerAction) => concat(
                of(triggerNotification({
                    type: 'success',
                    content: (
                        <div>
                            server <strong>{payload.server.name}</strong> successfully saved
                        </div>
                    ),
                    ttl: 3000,
                })),
                of(removeContentFromAllPanesAction(
                    'default',
                    'server.create'
                ))
            ))
        )

export const serversEpic = combineEpics(
    createServerEpic
)
