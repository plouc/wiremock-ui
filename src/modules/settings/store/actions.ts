import { isString, isBoolean } from 'lodash'
import { action, createAction } from 'typesafe-actions'
import { IAction } from '../../../store'
import { SettingsActionTypes } from './types'
import { ISettings } from '../types'

export interface IInitSettingsAction extends IAction {
    type: SettingsActionTypes.INIT_SETTINGS
    payload: ISettings
}

export const initSettings = (settings: ISettings) => action(SettingsActionTypes.INIT_SETTINGS, settings)

export interface ISetSettingAction extends IAction {
    type: SettingsActionTypes.SET_SETTING
    payload: {
        key: string
        value: any
    }
}

export const setSetting = createAction(
    SettingsActionTypes.SET_SETTING,
    resolve => (key: string, value: any) => {
        if (isString(value)) {
            localStorage.setItem(key, value)
        } else if (isBoolean(value)) {
            localStorage.setItem(key, value ? 'true' : 'false')
        }

        return resolve({ key, value })
    }
)

export type SettingsAction =
    | IInitSettingsAction
    | ISetSettingAction