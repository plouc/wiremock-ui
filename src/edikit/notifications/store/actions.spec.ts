import { INotification } from '../types'
import { NotificationsActionTypes } from './types'
import {
    triggerNotification,
    closeNotification,
} from './actions'

describe('triggerNotification', () => {
    it('should return corresponding action', () => {
        const notification: Pick<INotification, 'type' | 'content'> = {
            type: 'default',
            content: 'test notification'
        }
        const action = triggerNotification(notification)
        expect(action.type).toBe(NotificationsActionTypes.TRIGGER_NOTIFICATION)
        expect(action.payload.notification.id).toBeDefined()
    })
})

describe('closeNotification', () => {
    it('should return corresponding action', () => {
        expect(closeNotification('notification_id')).toEqual({
            type: NotificationsActionTypes.CLOSE_NOTIFICATION,
            payload: {
                notificationId: 'notification_id',
            }
        })
    })
})
