import * as React from 'react'
import { withTheme } from 'styled-components'
import { Container, Block } from './EmptyPane_styled'
import { ITheme } from '../../theming'

export interface IEmptyPaneProps {
    theme: ITheme
}

class EmptyPane extends React.Component<IEmptyPaneProps> {
    render() {
        return (
            <Container>
                <Block/>
            </Container>
        )
    }
}

export default withTheme(EmptyPane)
