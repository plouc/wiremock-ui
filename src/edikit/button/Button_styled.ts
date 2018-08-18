import styled from 'styled-components'

export interface IContainerProps {
    hasIcon: boolean
    hasContent: boolean
    size: 'normal' | 'large'
    variant: 'default' | 'primary' | 'success' | 'warning' | 'danger'
}

export const Container = styled.span<IContainerProps>`
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 2px;
    font-weight: 500;
    transition: background 200ms;
    justify-content: ${props => (props.hasIcon && props.hasContent ? 'space-between' : 'center')};
    font-size: ${props => {
        if (props.size === 'large') return '16px'
        return '13px'
    }};
    padding: ${props => {
        if (props.size === 'large') return '3px 12px'
        return '2px 11px'
    }};
    color: ${props => {
        if (props.variant === 'primary') {
            return props.theme.colors.overAccent
        }
        if (props.variant === 'success') {
            return props.theme.colors.overSuccess
        }
        if (props.variant === 'warning') {
            return props.theme.colors.overWarning
        }
        if (props.variant === 'danger') {
            return props.theme.colors.overDanger
        }

        return props.theme.colors.text
    }};
    background: ${props => {
        if (props.variant === 'primary') {
            return props.theme.colors.accent
        }
        if (props.variant === 'success') {
            return props.theme.colors.success
        }
        if (props.variant === 'warning') {
            return props.theme.colors.warning
        }
        if (props.variant === 'danger') {
            return props.theme.colors.danger
        }

        return props.theme.colors.background
    }};
    &:focus {
        outline: 0;
    }
`
