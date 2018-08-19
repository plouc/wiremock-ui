import * as React from 'react'
import { PlusCircle } from 'react-feather'
import { IContentRenderContext } from 'edikit'
import { IData } from '../../types'
import MappingIcon from './components/MappingIcon'
import MappingContainer from './containers/MappingContainer'
import CreateMappingContainer from './containers/CreateMappingContainer'

export const mappingsContentTypes = [
    {
        id: 'mapping',
        renderButton: (context: IContentRenderContext<IData>) => {
            return 'mapping'
            /*
            const mapping = mappingFromContent(app, content)

            return `${mapping.request.method} ${mapping.request.url}`
            */
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
