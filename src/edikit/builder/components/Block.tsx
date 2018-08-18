import * as React from 'react'
import styled, { withTheme } from 'styled-components'
import { ITheme } from 'edikit'

interface IContainerProps {
    withLink: boolean
}

const Container = styled.div<IContainerProps>`
    position: relative;
    padding: calc(${props => props.theme.builder.spacing} / 2) 0;
    
    &:first-child {
        padding-top: ${props => props.theme.builder.spacing};
    }
    &:last-child {
        padding-bottom: 0;
    }
    
    ${props => {
        if (props.withLink === false) return ''
        return `
            &:before {
                content: "";
                position: absolute;
                width: 2px;
                top: 0;
                left: 22px;
                bottom: 0;
                background: ${props.theme.builder.link.color};
            }
        `
    }}
`

const Header = styled.header`
`

const Title = styled.div`
    font-weight: 600;
`

interface IContentProps {
    withMarker: boolean
    markerColor: string
}

const Content = styled.div<IContentProps>`
    padding: 9px 16px;
    border-radius: 2px;
    position: relative;
    background: ${props => props.theme.builder.block.background};
    ${props => props.theme.builder.block.css}
    
    &:before {
        content: "";
        position: absolute;
        width: 4px;
        top: 0;
        left: 0;
        bottom: 0;
        background: ${props => props.markerColor};
    }
`

interface IBlockProps {
    withLink?: boolean
    withMarker?: boolean
    markerColor?: string
    title?: React.ReactNode
    icon?: React.ReactNode
    children?: React.ReactNode
    theme: ITheme
}

class Block extends React.Component<IBlockProps> {
    static defaultProps = {
        withMarker: true,
        markerColor: 'accent',
        withLink: false
    }

    render() {
        const {
            title,
            children,
            withLink,
            withMarker,
            markerColor: markerColorKey,
            theme,
        } = this.props

        if (title === undefined && children === undefined) {
            return null
        }

        let markerColor = theme.colors[markerColorKey!]
        if (markerColor === undefined) {
            markerColor = markerColorKey
        }

        return (
            <Container withLink={withLink!}>
                <Content
                    withMarker={withMarker!}
                    markerColor={markerColor}
                >
                    {title && (
                        <Header>
                            <Title>{title}</Title>
                        </Header>
                    )}
                    <div>
                        {children}
                    </div>
                </Content>
            </Container>
        )
    }
}

export default withTheme(Block)
