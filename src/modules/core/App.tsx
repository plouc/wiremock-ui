import * as React from 'react'
import SplitPane from 'react-split-pane'
import AppBar from './AppBar'
import Sidebar from './Sidebar'
import { Container, Inner } from './App_styled'
import { PaneManager, Pane } from '../../impl/pane'
import { ITreeNode, ITreeClickHandler } from '../../impl/tree'

export interface IAppProps {
    tree: ITreeNode
    openedTreeNodeIds: string[]
    currentTreeNodeIds: string[]
    onTreeClick: ITreeClickHandler
    paneManager: PaneManager
}

export default class App extends React.Component<IAppProps> {
    render() {
        const {
            tree,
            openedTreeNodeIds,
            currentTreeNodeIds,
            onTreeClick,
            paneManager,
        } = this.props

        return (
            <Container>
                <AppBar paneManager={paneManager}/>
                <Inner>
                    <SplitPane split="vertical" defaultSize={260}>
                        <Sidebar
                            tree={tree}
                            openedTreeNodeIds={openedTreeNodeIds}
                            currentTreeNodeIds={currentTreeNodeIds}
                            onTreeClick={onTreeClick}
                        />
                        <Pane
                            manager={paneManager}
                            paneId="root"
                        />
                    </SplitPane>
                </Inner>
            </Container>
        )
    }
}
