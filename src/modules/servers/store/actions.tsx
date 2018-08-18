import * as React from 'react'
import { action } from 'typesafe-actions'
import { ServersActionTypes } from './types'
import { IServer } from '../types'

export interface IInitServersAction {
    type: ServersActionTypes.INIT_SERVERS
    payload: {
        servers: IServer[]
    }
}

export const initServers = (servers: IServer[]) =>
    action(ServersActionTypes.INIT_SERVERS, { servers })

export interface ICreateServerAction {
    type: ServersActionTypes.CREATE_SERVER
    payload: {
        server: IServer
    }
}

export const createServer = (server: Pick<IServer, 'name' | 'url' | 'port'>) => action(
    ServersActionTypes.CREATE_SERVER,
    { server },
    {
        notification: {
            type: 'success',
            content: (
                <div>
                    server <strong>{server.name}</strong> successfully created
                </div>
            ),
            ttl: 3000,
        },
    }
)

export interface ISelectServerAction {
    type: ServersActionTypes.SELECT_SERVER
    payload: {
        serverId: string
    }
}

export const selectServer = (serverId: string) =>
    action(ServersActionTypes.SELECT_SERVER, { serverId })

export interface IUpdateServerAction {
    type: ServersActionTypes.UPDATE_SERVER
    payload: {
        server: IServer
    }
}

export const updateServer = (server: IServer) =>
    action(ServersActionTypes.UPDATE_SERVER, { server })

export interface IRemoveServerAction {
    type: ServersActionTypes.REMOVE_SERVER
    payload: {
        serverId: string
    }
}

export const removeServer = (serverId: string) =>
    action(ServersActionTypes.REMOVE_SERVER, { serverId })

export type ServersAction =
    | IInitServersAction
    | ICreateServerAction
    | ISelectServerAction
    | IUpdateServerAction
    | IRemoveServerAction
