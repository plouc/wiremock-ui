import * as React from 'react'
import SettingsIcon from './components/SettingsIcon'
import Settings from './containers/SettingsContainer'

export const settingsContentTypes = [
    {
        id: 'settings',
        renderButton: () => 'settings',
        renderIcon: () => <SettingsIcon/>,
        renderPane: () => <Settings/>,
    }
]