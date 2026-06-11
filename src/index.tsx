import React from 'react'
import { createRoot } from 'react-dom/client'
import GlobalStyles from './globalStyles'
import './editorConfig'
import Root from './Root'
import configureStore from './configureStore'
import { setStoreRef } from './storeRef'

const store = configureStore()
setStoreRef(store)

createRoot(document.getElementById('root')!).render(
    <React.Fragment>
        <GlobalStyles/>
        <Root store={store}/>
    </React.Fragment>
)
