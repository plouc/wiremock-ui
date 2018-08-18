import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { addCurrentPaneContentAction, IPaneContent } from 'edikit'
import { IApplicationState } from '../../../store'
import { IData } from '../../../types'
import { loadState } from '../store'
import App from '../components/App'

const mapStateToProps = ({
    core: { hasBeenInitialized },
    settings: { settings },
}: IApplicationState) => ({
    hasBeenInitialized,
    settings,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadState: () => {
        dispatch(loadState())
    },
    addCurrentPaneContent: (content: IPaneContent<IData>) => {
        dispatch(addCurrentPaneContentAction<IData>(
            'default',
            content
        ))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
