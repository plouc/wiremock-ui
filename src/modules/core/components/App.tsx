import * as React from 'react'
import SplitPane from 'react-split-pane'
import { ThemeProvider } from 'styled-components'
import {createPaneManager, IPaneContent} from 'edikit'
import themes from '../../../themes'
import { ISettings, settingsContentTypes } from '../../settings'
import { serversContentTypes } from '../../servers'
import { mappingsContentTypes } from '../../mappings'
import ExplorerContainer from '../containers/ExplorerContainer'
import AppBar from './AppBar'
import { Container, Inner } from './App_styled'
import { IApplicationState } from '../../../store'
import { IData } from '../../../types'

const PaneManager = createPaneManager<IApplicationState, IData>({
    namespace: 'default',
    contentTypes: [
        ...settingsContentTypes,
        ...serversContentTypes,
        ...mappingsContentTypes,
    ],
})

export interface IAppProps {
    loadState: () => void
    hasBeenInitialized: boolean
    settings: ISettings,
    addContentToCurrentPane(content: IPaneContent<IData>): void
}

export default class App extends React.Component<IAppProps> {
    componentDidMount() {
        this.props.loadState()
    }

    render() {
        const {
            hasBeenInitialized,
            settings,
            addContentToCurrentPane,
        } = this.props

        if (!hasBeenInitialized) return null

        return (
            <ThemeProvider theme={themes[settings.theme]}>
                <Container>
                    <AppBar
                        addContentToCurrentPane={addContentToCurrentPane}
                    />
                    <Inner>
                        <SplitPane split="vertical" defaultSize={260}>
                            <ExplorerContainer
                                addContentToCurrentPane={addContentToCurrentPane}
                            />
                            <PaneManager/>
                        </SplitPane>
                    </Inner>
                </Container>
            </ThemeProvider>
        )
    }
}
