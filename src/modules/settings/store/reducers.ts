import { ISettings } from '../types'
import { SettingsActionTypes } from './types'
import { SettingsAction } from './actions'

export interface ISettingsState {
    settings: ISettings
}

const initialState = {
    settings: {
        theme: 'white'
    }
}

export const settingsReducer = (
    state: ISettingsState = initialState,
    action: SettingsAction
): ISettingsState => {
    switch (action.type) {
        case SettingsActionTypes.INIT_SETTINGS:
            return {
                ...state,
                settings: action.payload
            }

        case SettingsActionTypes.SET_SETTING:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    [action.payload.key]: action.payload.value
                }
            }

        default:
            return state
    }
}

