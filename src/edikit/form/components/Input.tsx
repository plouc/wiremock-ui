import * as React from 'react'
import styled from 'styled-components'

const Node = styled.input`
    width: 100%;
    display: inline-block;
    padding: 2px 12px;
    height: 30px;
    font-size: 13px;
    border: none;
    cursor: pointer;
    transition: all 200ms ease-in;
    background: ${props => props.theme.form.input.background};
    color: ${props => props.theme.form.input.color};
    border: ${props => props.theme.form.input.border};
    ${props => props.theme.form.input.css}
    
    &::-webkit-input-placeholder {
        font-size: 13px;
        color: ${props => props.theme.form.input.placeholder.color};
    }
    
    &:hover {
        background: ${props => props.theme.form.input.hover.background};
        color: ${props => props.theme.form.input.hover.color};
        border: ${props => props.theme.form.input.hover.border};
        ${props => props.theme.form.input.hover.css}
    }
    
    &:focus {
        cursor: auto;
        outline: transparent;
        background: ${props => props.theme.form.input.focus.background};
        color: ${props => props.theme.form.input.focus.color};
        border: ${props => props.theme.form.input.focus.border};
        ${props => props.theme.form.input.focus.css}
    }
`

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {

}

export default class Input extends React.Component<InputProps> {
    render() {
        return (
            <Node {...this.props}/>
        )
    }
}
