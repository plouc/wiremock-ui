import * as React from 'react'
import PaneHeaderButton from './PaneHeaderButton'
import SplitPaneIcon from './SplitPaneIcon'
import { Container, Buttons, SplitButtons } from './PaneHeader_styled'
import { IPane, IContentType, PaneSplitAxis } from '../types'

export interface IPaneHeaderProps<ContentData> {
    contentTypes: Array<IContentType<ContentData>>
    pane: IPane<ContentData>
    setCurrentContent: (contentId: string) => void
    removeContent: (contentId: string) => void
    splitPane: (axis: PaneSplitAxis) => void
}

export default class PaneHeader<ContentData> extends React.Component<IPaneHeaderProps<ContentData>> {
    splitHorizontally = (e: React.SyntheticEvent) => {
        e.stopPropagation()
        this.props.splitPane(PaneSplitAxis.Horizontal)
    }

    splitVertically = (e: React.SyntheticEvent) => {
        e.stopPropagation()
        this.props.splitPane(PaneSplitAxis.Vertical)
    }

    render() {
        const {
            pane,
            contentTypes,
            setCurrentContent,
            removeContent,
        } = this.props

        return (
            <Container>
                <Buttons>
                    {pane.contents.map(content => (
                        <PaneHeaderButton
                            key={content.id}
                            pane={pane}
                            content={content}
                            contentTypes={contentTypes}
                            setCurrentContent={setCurrentContent}
                            removeContent={removeContent}
                        />
                    ))}
                </Buttons>
                {pane.contents.length > 0 && (
                    <SplitButtons>
                        <SplitPaneIcon axis="horizontal" onClick={this.splitHorizontally} />
                        <SplitPaneIcon axis="vertical" onClick={this.splitVertically} />
                    </SplitButtons>
                )}
            </Container>
        )
    }
}
