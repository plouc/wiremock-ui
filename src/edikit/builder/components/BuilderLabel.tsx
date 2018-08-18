import * as React from 'react'
import styled from 'styled-components'

const Label = styled.div`
    position: absolute;
    z-index: 10;
    top: calc(${props => props.theme.builder.spacing} / 2);
    left: 0;
    height: 28px;
    padding: 0 13px;
    display: flex;
    align-items: center;
    border-radius: 14px;
    overflow: hidden;
    font-weight: bold;
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: ${props => props.theme.builder.label.background};
    color: ${props => props.theme.builder.label.color};
    ${props => props.theme.builder.label.css}
`

interface IContainerProps {
    withLink: boolean
}

const Container = styled.div<IContainerProps>`
    position: relative;
    height: calc(${props => props.theme.builder.spacing} + 28px);
    display: flex;
    
    &:first-child {
        padding-top: calc(${props => props.theme.builder.spacing} * 1.5 + 28px);
        ${Label} {
            top: ${props => props.theme.builder.spacing};
        }
    }
    
    &:last-child {
        height: calc(${props => props.theme.builder.spacing} / 2 + 28px);
    }
    
    ${props => {
        if (props.withLink === false) return ''
        return `
            &:before {
                z-index: 0;
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

interface IBuilderLabelProps {
    label?: React.ReactNode
    children?: React.ReactNode
    withLink: boolean
    style: any
    onClick?: React.MouseEventHandler
}

export default class BuilderLabel extends React.Component<IBuilderLabelProps> {
    static defaultProps = {
        withLink: false,
        style: {}
    }

    render() {
        const { label, children, withLink, style, onClick } = this.props

        if (label === undefined && children === undefined) {
            return null
        }

        return (
            <Container withLink={withLink}>
                <Label style={style} onClick={onClick}>
                    {label || children}
                </Label>
            </Container>
        )
    }
}
