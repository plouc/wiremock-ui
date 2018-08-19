import styled from 'styled-components'

export const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
`

export const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: ${props => props.theme.pane.body.background};
    ${props => props.theme.pane.body.css}
`

interface IContentProps {
    isLoading: boolean
}

export const Content = styled.div<IContentProps>`
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    transition: opacity 200ms;
    opacity: ${props => props.isLoading ? .5 : 1};
`

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    z-index: 100;
`