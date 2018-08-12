import styled from 'styled-components'

export const Container = styled.div`
    height: 100%;
    width: 100%;
    background: ${props => props.theme.pane.body.background};
    ${props => props.theme.pane.body.css}
`
