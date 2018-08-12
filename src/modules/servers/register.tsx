import * as React from 'react'
import { PlusCircle } from 'react-feather'
import AppContainer from '../core/AppContainer'
import { PaneManager } from '../../impl/pane'
import CreateServer from './components/CreateServer'

export default (app: AppContainer, manager: PaneManager) => {
    manager.addContentType({
        id: 'server.create',
        renderButton: () => 'create server',
        renderIcon: () => <PlusCircle size={14}/>,
        renderPane: () => (
            <CreateServer
                addServer={app.addServer}
            />
        ),
    })
}