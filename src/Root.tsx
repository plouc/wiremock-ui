import * as React from 'react'
import { Store } from 'redux'
import { Provider } from 'react-redux'
import { IApplicationState } from './store'
import AppContainer from './modules/core/containers/AppContainer'

interface IRootProps {
    store: Store<IApplicationState>
}

class Root extends React.Component<IRootProps> {
    render() {
        const { store } = this.props

        return (
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        )
    }
}

export default Root