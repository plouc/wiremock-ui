import styled from 'styled-components'

export const Container = styled.div`
    position: absolute;
    top: calc(${props => props.theme.pane.spacing} / 2);
    right: calc(${props => props.theme.pane.spacing} / 2);
    bottom: calc(${props => props.theme.pane.spacing} / 2);
    left: calc(${props => props.theme.pane.spacing} / 2);
`
