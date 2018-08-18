import styled from 'styled-components'

export interface IPartProps {
    side: 'left' | 'right'
}

export const Part = styled.div<IPartProps>`
    flex-shrink: 0;
    width: 5px;
    height: 12px;
    left: 0;
    margin-top: 2px;
    border: 1px solid ${props => props.theme.colors.muted};
    border-left-width: ${props => (props.side === 'left' ? '1px' : '0')};
    border-right-width: ${props => (props.side === 'right' ? '1px' : '0')};
`

export const Line = styled.span`
    flex-shrink: 0;
    width: 2px;
    height: 16px;
    margin: 0 1px;
    background: ${props => props.theme.colors.accent};
`

export interface IAxisProps {
    axis: 'horizontal' | 'vertical'
}

export const Icon = styled.div<IAxisProps>`
    width: 14px;
    height: 16px;
    display: flex;
    overflow: hidden;
    transform: ${props => (props.axis === 'horizontal' ? 'rotate(90deg)' : 'none')};
`

export const Container = styled.div`
    flex-shrink: 0;
    height: ${props => props.theme.pane.header.height};
    width: 26px;
    display flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    &:hover ${Part} {
        background: ${props => props.theme.colors.muted};
    }
`
