import * as React from 'react'
import { PlusCircle } from 'react-feather'
import { IContentRenderContext } from 'edikit'
import { IData } from '../../types'
import { getStoreRef } from '../../storeRef'
import { getMappingUrl } from './dto'
import MappingIcon from './components/MappingIcon'
import MappingContainer from './containers/MappingContainer'
import CreateMappingContainer from './containers/CreateMappingContainer'

export const mappingsContentTypes = [
    {
        id: 'mapping',
        renderButton: (context: IContentRenderContext<IData>) => {
            const store = getStoreRef()
            if (store && context.content.data) {
                const { serverName, mappingId } = context.content.data
                const state = store.getState()
                const serverMappings = state.mappings[serverName]
                if (serverMappings && mappingId) {
                    const entry = serverMappings.byId[mappingId]
                    if (entry && entry.mapping) {
                        const m = entry.mapping
                        return m.name || `${m.request.method} ${getMappingUrl(m)}`
                    }
                }
            }
            return 'mapping'
        },
        renderIcon: () => <MappingIcon/>,
        renderPane: (context: IContentRenderContext<IData>) => (
            <MappingContainer
                key={context.content.id}
                serverName={context.content.data!.serverName}
                mappingId={context.content.data!.mappingId!}
            />
        ),
    },
    {
        id: 'mapping.create',
        renderButton: () => 'create mapping',
        renderIcon: () => <PlusCircle size={14}/>,
        renderPane: (context: IContentRenderContext<IData>) => (
            <CreateMappingContainer
                key={context.content.id}
                serverName={context.content.data!.serverName}
                creationId={context.content.data!.creationId!}
            />
        )
    }
]
