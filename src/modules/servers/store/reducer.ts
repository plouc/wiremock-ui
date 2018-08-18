import {Reducer} from 'redux'
import { ServersActionTypes } from './types'
import { IServer } from '../types'

export interface IServersState {
    readonly servers: IServer[]
}

const initialState: IServersState = {
    servers: [],
}

const reducer: Reducer<IServersState> = (state = initialState, action) => {
    switch (action.type) {
        case ServersActionTypes.INIT_SERVERS: {
            return {
                ...state,
                servers: action.payload.servers.map((s: Partial<IServer>) => ({
                    ...s,
                    mappingsHaveBeenLoaded: false,
                    isLoadingMappings: false,
                    mappings: []
                }))
            }
        }

        case ServersActionTypes.CREATE_SERVER: {
            return {
                ...state,
                servers: [
                    ...state.servers,
                    action.payload,
                ]
            }
        }

        default: {
            return state
        }
    }
}

export { reducer as serversReducer }