import { combineEpics, Epic } from 'redux-observable'
import { from } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { IAction } from '../../../store'
import { initServers } from '../../servers'
import { initSettings } from '../../settings'
import { loadStateFinished } from './actions'
import { CoreActionTypes } from './types'

export const loadStateEpic: Epic<IAction, any> = action$ =>
    action$.ofType(CoreActionTypes.LOAD_STATE)
        .pipe(
            mergeMap(() => {
                const theme = localStorage.getItem('theme') || 'solarized dark'
                const actions: IAction[] = [initSettings({
                    theme
                })]

                let servers: any = localStorage.getItem('servers')
                if (servers) {
                    servers = JSON.parse(servers)
                    actions.push(initServers(servers))
                }

                return from([
                    ...actions,
                    loadStateFinished()
                ])
            })
        )

export const coreEpic = combineEpics(
    loadStateEpic
)

