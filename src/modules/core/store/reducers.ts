import { CoreActionTypes } from './types'
import { CoreAction } from './actions'

export interface ICoreState {
    hasBeenInitialized: boolean
}

const initialState = {
    hasBeenInitialized: false,
}

export const coreReducer = (
    state: ICoreState = initialState,
    action: CoreAction
): ICoreState => {
    switch (action.type) {
        case CoreActionTypes.LOAD_STATE_FINISHED:
            return {
                ...state,
                hasBeenInitialized: true
            }

        default:
            return state
    }
}

