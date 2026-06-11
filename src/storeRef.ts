import { Store } from 'redux'
import { IApplicationState } from './store'

let storeRef: Store<IApplicationState> | null = null

export const setStoreRef = (store: Store<IApplicationState>) => {
    storeRef = store
}

export const getStoreRef = (): Store<IApplicationState> | null => storeRef
