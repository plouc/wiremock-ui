import { Epic, combineEpics } from 'redux-observable'
import { from } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { initSettings } from '../../settings'
import { initServers, IServer } from '../../servers'
import { IMapping } from '../../mappings'
import { IAction } from '../../../store'
import { loadState, loadStateFinished } from './actions'
import { CoreActionTypes } from './types'

interface ICfgServer {
    name: string;
    url: string;
    port: number
}

interface ICfgMapping {
    servers: ICfgServer[]
}

export const loadStateEpic: Epic<IAction, any> = action$ =>
    action$.ofType(CoreActionTypes.LOAD_STATE)
        .pipe(
            mergeMap((action: typeof loadState) => {
                const theme = localStorage.getItem('theme') || 'solarized dark'
                const actions: IAction[] = [initSettings({
                    theme
                })]

                let servers: any = localStorage.getItem('servers')
                if (!servers) {
                    // tslint:disable-next-line: no-console
                    const defaultServers = require( '../../../../src/config/defaultServers.json') as ICfgMapping
                    const tempServers : IServer[] = []
                    defaultServers.servers.forEach(cfgServer => {
                        const cfgAppend: IServer = {
                            name: cfgServer.name,
                            url: cfgServer.url,
                            port: cfgServer.port,
                            mappingsHaveBeenLoaded: false,
                            isLoadingMappings: false,
                            mappings: Array<IMapping>()
                        }
                        tempServers.push(cfgAppend)
                    })
                    actions.push(initServers(tempServers))
                }
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
