import styled from 'styled-components'

export const Container = styled.aside`
    overflow: auto;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.tree.container.background};
    ${props => props.theme.tree.container.extend};
`
