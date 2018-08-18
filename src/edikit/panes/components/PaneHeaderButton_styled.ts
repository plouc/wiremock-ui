import styled from 'styled-components'

export interface IContainerProps {
    isCurrent: boolean
}

export const Container = styled.span<IContainerProps>`
    position: relative;
    display: flex;
    overflow: hidden;
    align-items: center;
    padding: 0 3px 0 12px;
    height: ${props => props.theme.pane.header.height};
    cursor: pointer;
    user-select: none;
    background: ${props =>
        props.isCurrent
            ? props.theme.pane.header.button.current.background
            : props.theme.pane.header.button.background};
        
    &:after {
        content: "";
        position: absolute;
        height: 2px;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${props => props.theme.colors.accent};
        opacity: ${props => props.isCurrent ? 1 : 0};
        transform: ${props => props.isCurrent ? 'scale3d(1, 1, 1)' : 'scale3d(0, 1, 1)'};
        transition: transform 300ms ease-out, opacity 300ms ease-in;
    }    
`

export const Label = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 6px;
`

export const RemoveButton = styled.span`
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 7px;
    color: ${props => props.theme.colors.muted};
    &:hover {
        color: ${props => props.theme.colors.accent};
    }
`
