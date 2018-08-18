import { Store } from 'redux'
import { ITriggerNotification, triggerNotification } from './actions'

interface IAction {
    type: string
    meta?: {
        notification?: ITriggerNotification
    }
}

export const notificationsMiddleware = (store: Store) => (next: any) => (action: IAction) => {
    const result = next(action)
    if (action.meta !== undefined && action.meta.notification !== undefined) {
        store.dispatch(triggerNotification(action.meta.notification))
    }

    return result
}