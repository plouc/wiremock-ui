import { INotification } from '../types'
import { NotificationsActionTypes } from './types'
import { NotificationsAction } from './actions'

export type INotificationsState = INotification[]

export const notificationsReducer = (
    state: INotificationsState = [],
    action: NotificationsAction
): INotificationsState => {
    switch (action.type) {
        case NotificationsActionTypes.TRIGGER_NOTIFICATION:
            return [
                ...state,
                action.payload.notification,
            ]

        case NotificationsActionTypes.CLOSE_NOTIFICATION:
            return state.filter(notification =>
                notification.id !== action.payload.notificationId
            )

        default:
            return state
    }
}

