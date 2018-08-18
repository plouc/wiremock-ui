import * as React from 'react'
import { IContentRenderContext } from 'edikit'
import { IData } from '../../types'
import MappingContainer from './containers/MappingContainer'
import MappingIcon from './components/MappingIcon'

export const mappingsContentTypes = [
    {
        id: 'mapping',
        renderButton: (context: IContentRenderContext<IData>) => {
            return 'Mapping'
            /*
            const mapping = mappingFromContent(app, content)

            return `${mapping.request.method} ${mapping.request.url}`
            */
        },
        renderIcon: (context: IContentRenderContext<IData>) => <MappingIcon/>,
        renderPane: (context: IContentRenderContext<IData>) => (
            <MappingContainer
                key={context.content.id}
                serverName={context.content.data!.serverName}
                mappingId={context.content.data!.mappingId!}
            />
        ),
    }
]
