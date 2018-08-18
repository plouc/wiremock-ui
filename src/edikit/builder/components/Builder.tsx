import * as React from 'react'
import styled, { withTheme } from 'styled-components'
import { ITheme } from 'edikit'

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background: ${props => props.theme.builder.background};
`

const Header = styled.header`
    padding: 9px 16px;
    background: ${props => props.theme.builder.header.background};
`

const Title = styled.div`
    font-weight: 600;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${props => props.theme.builder.header.title.color};
`

const Subtitle = styled.div`
    font-size: 13px;
    color: ${props => props.theme.builder.header.subtitle.color};
`

const Content = styled.div`
    padding: 0 16px 18px;
    overflow: hidden;
`

interface IBuilderProps {
    title?: React.ReactNode
    subtitle?: React.ReactNode
    icon?: React.ReactNode
    children?: React.ReactNode
    theme: ITheme
}

class Builder extends React.Component<IBuilderProps> {
    render() {
        const {
            title,
            subtitle,
            children,
        } = this.props

        return (
            <Container>
                {title && (
                    <Header>
                        <Title>{title}</Title>
                        {subtitle && <Subtitle>{subtitle}</Subtitle>}
                    </Header>
                )}
                {children && <Content>{children}</Content>}
            </Container>
        )
    }
}

export default withTheme(Builder)
