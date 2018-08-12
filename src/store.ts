import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { IServersState, serversReducer } from './modules/servers'

export interface IApplicationState {
    servers: IServersState
}

export const rootReducer = combineReducers<IApplicationState>({
    servers: serversReducer,
})
