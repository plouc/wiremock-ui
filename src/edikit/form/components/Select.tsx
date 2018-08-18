import * as React from 'react'
import styled from 'styled-components'
import { ChevronUp, ChevronDown } from 'react-feather'

const Container = styled.div`
    height: 30px;
    border: 1px solid ${props => props.theme.form.select.borderColor || props.theme.form.select.background || 'transparent'};
    border-radius: 3px;
    display: inline-flex;
    position: relative;
    transition: all 200ms ease-in;
    background: ${props => props.theme.form.select.background || 'transparent'};
    color: ${props => props.theme.form.select.color || 'inherit'};
    ${props => props.theme.form.select.css};
    
    &:focus-within {
        ${props => props.theme.form.select.focus.css};
    }
`

const Node = styled.select`
    flex: 1;
    background: transparent;
    border: none;
    font-size: 13px;
    height: 28px;
    padding: 0 29px 0 9px;
    color: inherit;
    -webkit-appearance: none;
    -moz-appearance: none;
    
    &:focus {
        outline: transparent;
    }
`

const Addon = styled.div`
    width: 20px;
    pointer-events: none;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0 2px 2px 0;
    color: ${props => props.theme.form.select.arrowsColor || 'inherit'};
    background: ${props => props.theme.form.select.addonBackground || 'transparent'};
`

interface InputProps extends React.InputHTMLAttributes<HTMLSelectElement> {}

export default class Select extends React.Component<InputProps> {
    render() {
        const { style, ...selectProps } = this.props

        return (
            <Container style={style}>
                <Node {...selectProps}/>
                <Addon>
                    <ChevronUp size={10}/>
                    <ChevronDown size={10}/>
                </Addon>
            </Container>
        )
    }
}
