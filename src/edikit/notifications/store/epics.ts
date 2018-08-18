import { Epic, combineEpics } from 'redux-observable'
import { of, EMPTY, from } from 'rxjs'
import { mergeMap, map, delay } from 'rxjs/operators'
import {
    closeNotification,
    ITriggerNotificationAction,
    NotificationsAction,
} from './actions'
import { NotificationsActionTypes } from './types'

export const triggerNotificationEpic: Epic<NotificationsAction, any, any> = action$ =>
    action$.ofType(NotificationsActionTypes.TRIGGER_NOTIFICATION)
        .pipe(
            mergeMap(({ payload: { notification } }: ITriggerNotificationAction) => {
                if (notification.ttl === undefined) return EMPTY

                return of(closeNotification(notification.id)).pipe(
                    delay(notification.ttl)
                )
            })
        )

export const notificationsEpic = combineEpics(
    triggerNotificationEpic
)
