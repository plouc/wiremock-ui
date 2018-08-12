import styled from 'styled-components'

export const Container = styled.div`
    height: 100%;
    width: 100%;
    background: ${props => props.theme.pane.body.background};
    ${props => props.theme.pane.body.css}
`

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 16px;
    padding: 16px 32px;
`

export const Title = styled.div`
    padding: 5px 0;
    font-weight: bold;
    font-size: 12px;
    text-transform: uppercase;
`

export interface ItemProps {
    isActive: boolean
}

export const Item = styled.div<ItemProps>`
    display: flex;
    align-items: center;
    padding: 2px 0;
    cursor: pointer;
    user-select: none;
    color: ${props => (props.isActive ? 'inherit' : props.theme.colors.muted)};
`
