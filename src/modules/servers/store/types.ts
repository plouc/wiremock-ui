import { IServer } from '../types'

export enum ServersActionTypes {
    CREATE_SERVER = '@@servers/CREATE_SERVER',
    SELECT_SERVER = '@@servers/SELECT_SERVER',
    UPDATE_SERVER = '@@servers/UPDATE_SERVER',
    REMOVE_SERVER = '@@servers/REMOVE_SERVER',
}

export interface IServersState {
    readonly servers: IServer[]
}