import { action, createAction } from 'typesafe-actions'
import uuid from '../../util/uuid'
import { INotification } from '../types'
import { NotificationsActionTypes } from './types'

export interface ITriggerNotification extends Pick<INotification, 'content' | 'ttl'> {
    id?: string
    type?: 'default' | 'success' | 'warning' | 'danger'
}

export interface ITriggerNotificationAction {
    type: NotificationsActionTypes.TRIGGER_NOTIFICATION
    payload: {
        notification: INotification
    }
}

export const triggerNotification = createAction(
    NotificationsActionTypes.TRIGGER_NOTIFICATION,
    resolve => (
        notification: ITriggerNotification
    ) => resolve({
        notification: {
            id: uuid(),
            type: 'default',
            ...notification,
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
