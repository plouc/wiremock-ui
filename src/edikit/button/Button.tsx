import * as React from 'react'
import { Container } from './Button_styled'

export type ButtonSize = 'normal' | 'large'

export type ButtonVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger'

export type ButtonIconPlacement = 'prepend' | 'append'

export interface IButtonProps {
    label?: React.ReactNode,
    children?: React.ReactNode,
    variant: ButtonVariant
    size: ButtonSize
    icon?: React.ReactNode
    iconPlacement: ButtonIconPlacement
    style?: React.CSSProperties
    onClick?: any
}

export default class Button extends React.Component<IButtonProps> {
    static defaultProps = {
        variant: 'default',
        size: 'normal',
        iconPlacement: 'prepend',
    }

    render() {
        const { label, children, variant, size, icon, iconPlacement, ...rest } = this.props

        let content = null
        if (children) {
            content = children
        } else if (label) {
            content = label
        }

        return (
            <Container
                {...rest}
                variant={variant}
                size={size}
                hasContent={content !== null}
                hasIcon={icon !== null}
                tabIndex={0}
            >
                {icon && iconPlacement === 'prepend' && icon}
                {label || children}
                {icon && iconPlacement === 'append' && icon}
            </Container>
        )
    }
}
