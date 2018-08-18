import * as React from 'react'
import { Container, Icon, Part, Line } from './SplitPaneIcon_styled'

export interface ISplitPaneIconProps {
    axis: 'horizontal' | 'vertical'
    onClick: React.MouseEventHandler
}

export default class SplitPaneIcon extends React.Component<ISplitPaneIconProps> {
    render() {
        return (
            <Container {...this.props}>
                <Icon axis={this.props.axis}>
                    <Part side="left" />
                    <Line />
                    <Part side="right" />
                </Icon>
            </Container>
        )
    }
}
