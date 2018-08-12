import * as React from 'react'
import AppContainer from '../core/AppContainer'
import { PaneManager, IPaneContent } from '../../impl/pane'
import { IMapping } from './schemas'
import Mapping from './Mapping'

const mappingFromContent = (app: AppContainer, content: IPaneContent): IMapping => {
    const server = app.state.servers.find(s => s.name === content.data.server)
    if (server === undefined) {
        throw new Error(`no server found with name: '${content.data.server}'`)
    }

    const mapping = server.mappings[content.data.mappingIndex]
    if (server === undefined) {
        throw new Error(`no mapping found for server: '${content.data.server}' at index: ${content.data.mappingIndex}`)
    }

    return mapping
}

export default (app: AppContainer, manager: PaneManager) => {
    manager.addContentType({
        id: 'mapping',
        renderButton: (content: IPaneContent) => {
            const mapping = mappingFromContent(app, content)

            return `${mapping.request.method} ${mapping.request.url}`
        },
        renderIcon: () => <span>M</span>,
        renderPane: (content: IPaneContent) => {
            const mapping = mappingFromContent(app, content)

            return (
                <Mapping mapping={mapping}/>
            )
        },
    })
}