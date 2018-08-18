import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './globalStyles'
import './editorConfig'
import Root from './Root'
import configureStore from './configureStore'

const store = configureStore()

ReactDOM.render(
    <Root store={store}/>,
    document.getElementById('root') as HTMLElement
)
