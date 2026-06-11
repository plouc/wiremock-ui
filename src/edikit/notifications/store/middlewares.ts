import { Middleware } from 'redux'
import { triggerNotification } from './actions'

export const notificationsMiddleware: Middleware = store => next => (action: any) => {
    const result = next(action)
    if (action.meta !== undefined && action.meta.notification !== undefined) {
        store.dispatch(triggerNotification(action.meta.notification))
    }

    return result
}