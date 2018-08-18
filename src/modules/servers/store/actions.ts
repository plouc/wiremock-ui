import { action } from 'typesafe-actions'
import { ServersActionTypes } from './types'
import { IServer } from '../types'

export const initServers = (servers: IServer[]) => action(ServersActionTypes.INIT_SERVERS, { servers })

export const createServer = (server: Pick<IServer, 'name' | 'url' | 'port'>) => action(
    ServersActionTypes.CREATE_SERVER,
    server
)

export const selectServer = (serverId: string) => action(ServersActionTypes.SELECT_SERVER, serverId)
export const updateServer = (server: IServer) => action(ServersActionTypes.UPDATE_SERVER, server)
export const removeServer = (serverId: string) => action(ServersActionTypes.REMOVE_SERVER, serverId)

export type ServersAction =
    | typeof initServers
    | typeof createServer
    | typeof selectServer
    | typeof updateServer
    | typeof removeServer
