import * as React from 'react'
import SplitPane from 'react-split-pane'
import { ThemeProvider, StyleSheetManager } from 'styled-components'
import { createPaneManager, IPaneContent, NotificationsContainer } from 'edikit'
import themes from '../../../themes'
import { ISettings, settingsContentTypes } from '../../settings'
import { serversContentTypes } from '../../servers'
import { mappingsContentTypes } from '../../mappings'
import { requestsContentTypes } from '../../requests'
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
        ...requestsContentTypes,
    ],
})

const customProps = new Set([
    'variant', 'hasContent', 'hasIcon', 'isDir', 'depth', 'iconCount',
    'isCurrent', 'isLoading', 'size', 'wasMatched', 'withMarker',
    'markerColor', 'withLink', 'isActive',
])

const shouldForwardProp = (prop: string) => !customProps.has(prop)

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
            <StyleSheetManager shouldForwardProp={shouldForwardProp}>
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
                        <NotificationsContainer/>
                    </Container>
                </ThemeProvider>
            </StyleSheetManager>
        )
    }
}
