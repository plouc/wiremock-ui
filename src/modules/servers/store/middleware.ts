import { Middleware } from 'redux'
import { IApplicationState } from '../../../store'
import { ServersActionTypes } from './types'

export const serversPersistMiddleware: Middleware<{}, IApplicationState> = store => next => action => {
    const result = next(action)

    if (action.type === ServersActionTypes.CREATE_SERVER) {
        const state = store.getState()
        const servers = state.servers.servers.map(s => ({
            name: s.name,
            url: s.url,
            port: s.port,
        }))
        localStorage.setItem('servers', JSON.stringify(servers))
    }

    return result
}
