import * as React from 'react'
import { withTheme } from 'styled-components'
import { Settings as Icon } from 'react-feather'

export interface ISettingsIconProps {
    theme: any
}

class SettingsIcon extends React.Component<ISettingsIconProps> {
    render() {
        const { theme } = this.props

        return (
            <Icon size={12} color={theme.colors.accent}/>
        )
    }
}

export default withTheme(SettingsIcon)
