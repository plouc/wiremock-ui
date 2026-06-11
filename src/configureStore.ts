import { Store, createStore, applyMiddleware, compose, Middleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { notificationsMiddleware } from 'edikit'
import { serversPersistMiddleware } from './modules/servers'
import { IApplicationState, rootReducer, rootEpic } from './store'

export default function configureStore(): Store<IApplicationState> {
    const epicMiddleware = createEpicMiddleware()

    const middlewares: Middleware[] = [
        epicMiddleware as unknown as Middleware,
        notificationsMiddleware,
        serversPersistMiddleware,
    ]

    const composeEnhancers =
        (typeof window !== 'undefined' &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
        compose

    const store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(...middlewares)
        )
    )

    epicMiddleware.run(rootEpic as any)

    return store
}
