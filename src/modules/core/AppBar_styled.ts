import styled from 'styled-components'

export const Container = styled.div`
    height: ${props => props.theme.header.height};
    padding: 0 12px 0 26px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${props => props.theme.header.background};
    color: ${props => props.theme.header.color};
`

export const Icons = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`

export const AppName = styled.span`
    font-weight: 900;
    font-size: 14px;
    display: flex;
    align-items: center;
    color: ${props => props.theme.header.brandColor};
`
