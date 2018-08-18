import styled from 'styled-components'

export const Container = styled.header`
    position: absolute;
    z-index: 20;
    top: 0;
    right: 0;
    left: 0;
    height: ${props => props.theme.pane.header.height};
    display: flex;
    font-size: 13px;
    justify-content: space-between;
    background: ${props => props.theme.pane.header.background};
    overflow: hidden;
`

export const Buttons = styled.div`
    display: flex;
    overflow: hidden;
`

export const SplitButtons = styled.div`
    flex-shrink: 0;
    display: flex;
    width: calc(${props => props.theme.pane.header.height} * 2);
`
