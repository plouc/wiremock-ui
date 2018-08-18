import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
import { panesReducer, IPanesState } from 'edikit'
import { coreReducer, CoreAction, ICoreState, coreEpic } from './modules/core'
import { mappingsReducer, IMappingsState, MappingsAction, mappingsEpic } from './modules/mappings'
import { serversReducer, IServersState, ServersAction } from './modules/servers'
import { settingsReducer, ISettingsState, SettingsAction } from './modules/settings'
import { IData } from './types'

export interface IAction {
    type: string
    payload?: {}
}

export type RootAction =
    | CoreAction
    | ServersAction
    | SettingsAction
    | MappingsAction

export const rootEpic = combineEpics(
    coreEpic,
    mappingsEpic
)

export interface IApplicationState {
    panes: IPanesState<IData>
    core: ICoreState
    settings: ISettingsState
    servers: IServersState
    mappings: IMappingsState
}

export const rootReducer = combineReducers<IApplicationState>({
    panes: panesReducer<IData>(),
    core: coreReducer,
    settings: settingsReducer,
    servers: serversReducer,
    mappings: mappingsReducer,
})
