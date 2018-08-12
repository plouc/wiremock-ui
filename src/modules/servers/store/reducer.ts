import {Reducer} from 'redux'
import {IServersState, ServersActionTypes} from './types'

const initialState: IServersState = {
    servers: [],
}

const reducer: Reducer<IServersState> = (state = initialState, action) => {
    switch (action.type) {
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