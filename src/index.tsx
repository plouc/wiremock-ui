import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './globalStyles'
import './editorConfig'
import App from './modules/core/AppContainer'
import configureStore from './configureStore'

const store = configureStore({
    servers: {
        servers: []
    }
})

ReactDOM.render(
    <App store={store}/>,
    document.getElementById('root') as HTMLElement
)
