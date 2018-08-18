import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import {
    addContentToCurrentPaneAction,
    IPaneContent,
} from 'edikit'
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
    addContentToCurrentPane: (content: IPaneContent<IData>) => {
        dispatch(addContentToCurrentPaneAction<IData>(
            'default',
            content
        ))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
