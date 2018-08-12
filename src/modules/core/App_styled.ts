import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.typography.default.fontFamily};
    font-size: ${props => props.theme.typography.fontSize};
    line-height: ${props => props.theme.typography.lineHeight};
`

export const Inner = styled.div`
    position: absolute;
    left: 0;
    top: ${props => props.theme.header.height};
    right: ${props => props.theme.pane.spacing};
    bottom: ${props => props.theme.pane.spacing};
`
