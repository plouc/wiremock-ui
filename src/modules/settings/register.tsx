import * as React from 'react'
import AppContainer from '../core/AppContainer'
import { PaneManager } from '../../impl/pane'
import themes from '../../impl/themes'
import SettingsIcon from './SettingsIcon'
import Settings from './Settings'

export default (app: AppContainer, manager: PaneManager) => {
    manager.addContentType({
        id: 'settings',
        renderButton: () => 'settings',
        renderIcon: () => <SettingsIcon/>,
        renderPane: () => (
            <Settings
                settings={app.state.settings}
                defineSetting={app.defineSetting}
                themes={Object.keys(themes)}
            />
        ),
    })
}