import {Store, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import {IApplicationState, rootReducer} from './store'

export default function configureStore(
    initialState: IApplicationState
): Store<IApplicationState> {
    const composeEnhancers = composeWithDevTools({})

    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers()
    )

    return store
}
