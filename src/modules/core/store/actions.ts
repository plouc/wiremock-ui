import { action } from 'typesafe-actions'
import { IAction } from '../../../store'
import { CoreActionTypes } from './types'

export const loadState = () => action(CoreActionTypes.LOAD_STATE)

export const loadStateFinished = () => action(CoreActionTypes.LOAD_STATE_FINISHED)

export type CoreAction =
    | IAction
