import styled from 'styled-components'

interface IContainerProps {
    isCurrent: boolean
}

export const Container = styled.div<IContainerProps>`
    position: absolute;
    top: calc(${props => props.theme.pane.spacing} / 2);
    right: calc(${props => props.theme.pane.spacing} / 2);
    bottom: calc(${props => props.theme.pane.spacing} / 2);
    left: calc(${props => props.theme.pane.spacing} / 2);
    ${props => props.theme.pane.css}
    ${props => props.isCurrent ? props.theme.pane.current.css : ''}
`

export const Content = styled.div`
    position: absolute;
    top: ${props => props.theme.pane.header.height};
    right: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 10;
`
