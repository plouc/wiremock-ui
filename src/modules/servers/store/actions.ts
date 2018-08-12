import { action } from 'typesafe-actions'
import { ServersActionTypes } from './types'
import {IServer} from '../types'

export const createServer = (server: IServer) => action(ServersActionTypes.CREATE_SERVER, server)
export const selectServer = (serverId: string) => action(ServersActionTypes.SELECT_SERVER, serverId)
export const updateServer = (server: IServer) => action(ServersActionTypes.UPDATE_SERVER, server)
export const removeServer = (serverId: string) => action(ServersActionTypes.REMOVE_SERVER, serverId)
