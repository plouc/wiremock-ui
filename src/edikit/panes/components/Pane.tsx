import * as React from 'react'
import SplitPane from 'react-split-pane'
import PaneHeader from './PaneHeader'
import EmptyPane from './EmptyPane'
import { Container, Content } from './Pane_styled'
import { IPane, IPaneContent, IContentType, PaneSplitAxis } from '../types'

export interface IPaneProps<Data> {
    pane: IPane<Data>
    panes: Array<IPane<Data>>
    contentTypes: Array<IContentType<Data>>
    setCurrentPane: (
        paneId: string
    ) => void
    setPaneCurrentContent: (
        paneId: string,
        contentId: string
    ) => void
    removePaneContent: (
        paneId: string,
        contentId: string
    ) => void
    splitPane: (
        paneId: string,
        axis: PaneSplitAxis
    ) => void
}

export default class Pane<Data> extends React.Component<IPaneProps<Data>> {
    setCurrentPane = () => {
        const { pane, setCurrentPane } = this.props
        setCurrentPane(pane.id)
    }

    setCurrentContent = (contentId: string) => {
        const { pane, setPaneCurrentContent } = this.props
        setPaneCurrentContent(pane.id, contentId)
    }

    removeContent = (contentId: string) => {
        const { pane, removePaneContent } = this.props
        removePaneContent(pane.id, contentId)
    }

    closeContent = (contentId: string) => () => {
        this.removeContent(contentId)
    }

    splitPane = (axis: PaneSplitAxis) => {
        const { pane, splitPane } = this.props
        splitPane(pane.id, axis)
    }

    render() {
        const {
            pane,
            panes,
            contentTypes,
            setCurrentPane,
            setPaneCurrentContent,
            removePaneContent,
            splitPane,
        } = this.props

        if (pane.split === true) {
            return (
                <SplitPane split={pane.splitAxis} defaultSize="50%">
                    {pane.children.map(childPaneId => {
                        const childPane = panes.find(p => p.id === childPaneId)
                        if (childPane === undefined) {
                            throw new Error(`no pane found for id: ${childPaneId}\n${JSON.stringify(pane)}`)
                        }

                        return (
                            <Pane
                                key={childPaneId}
                                pane={childPane}
                                panes={panes}
                                contentTypes={contentTypes}
                                setCurrentPane={setCurrentPane}
                                setPaneCurrentContent={setPaneCurrentContent}
                                removePaneContent={removePaneContent}
                                splitPane={splitPane}
                            />
                        )
                    })}
                </SplitPane>
            )
        }

        let contents: Array<IPaneContent<Data>> = []
        let content
        if (pane !== undefined) {
            contents = pane.contents
            content = contents.find(c => c.isCurrent)
        }

        if (content === undefined) return <EmptyPane />

        const foundContent = content as IPaneContent<Data>
        const contentType = contentTypes.find(ct => ct.id === foundContent.type)
        if (contentType === undefined) {
            throw new Error(`unsupported content type: ${foundContent.type}\n${JSON.stringify(foundContent)}`)
        }

        return (
            <Container
                isCurrent={pane.isCurrent}
                onClick={this.setCurrentPane}
            >
                <PaneHeader
                    contentTypes={contentTypes}
                    pane={pane}
                    setCurrentContent={this.setCurrentContent}
                    removeContent={this.removeContent}
                    splitPane={this.splitPane}
                />
                <Content>
                    {contentType.renderPane({
                        content: foundContent,
                        pane,
                        extra: {
                            close: this.closeContent(content.id)
                        }
                    })}
                </Content>
            </Container>
        )
    }
}
