import * as React from 'react'
import { withTheme } from 'styled-components'
import { Slash, Check, X } from 'react-feather'
import { ITheme, IThemeColors } from 'edikit'

const mapping = {
    'ok': 'success',
    'ko': 'danger',
    'warn': 'warning',
    'none': 'muted',
}

export const getColorForStatus = (colors: IThemeColors, status?: 'ok' | 'ko' | 'warn' | 'none') => {
    if (status === undefined || status === null) {
        return colors.accent
    }

    return colors[mapping[status]]
}


export interface IStatusIconProps {
    size: number | string
    status?: 'ok' | 'ko' | 'warn' | 'none'
    style?: React.CSSProperties
    theme: ITheme
}

class StatusIcon extends React.Component<IStatusIconProps> {
    public static defaultProps = {
        style: {},
    }

    public render() {
        const { size, status, style, theme } = this.props

        const color = getColorForStatus(theme.colors, status)
        const props = { size, color, style }

        if (status === undefined || status === null) {
            return <span />
        }

        if (status === 'ok') return <Check {...props} />
        if (status === 'ko') return <X {...props} />

        return <Slash {...props} />
    }
}

export default withTheme(StatusIcon)
