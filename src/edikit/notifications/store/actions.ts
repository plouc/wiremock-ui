import { action, createAction } from 'typesafe-actions'
import uuid from '../../util/uuid'
import { INotification } from '../types'
import { NotificationsActionTypes } from './types'

export interface ITriggerNotificationAction {
    type: NotificationsActionTypes.TRIGGER_NOTIFICATION
    payload: {
        notification: INotification
    }
}

export const triggerNotification = createAction(
    NotificationsActionTypes.TRIGGER_NOTIFICATION,
    resolve => (
        notification: Pick<INotification, 'type' | 'content' | 'ttl'>
    ) => resolve({
        notification: {
            ...notification,
            id: uuid(),
        },
    })
)

export interface ICloseNotificationAction {
    type: NotificationsActionTypes.CLOSE_NOTIFICATION
    payload: {
        notificationId: string
    }
}

export const closeNotification = (
    notificationId: string
) => action(
    NotificationsActionTypes.CLOSE_NOTIFICATION,
    {
        notificationId,
    }
)

export type NotificationsAction =
    | ITriggerNotificationAction
    | ICloseNotificationAction
