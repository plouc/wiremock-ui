import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Block = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 120px;
    opacity: 0.2;
`

export const Brand = styled.span`
    color: ${props => props.theme.colors.accent};
    font-weight: 800;
    font-size: 32px;
    margin-left: 16px;
`
