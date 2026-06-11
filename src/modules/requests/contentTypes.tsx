import * as React from 'react'
import { IContentRenderContext } from 'edikit'
import { IData } from '../../types'
import RequestsIcon from './components/RequestsIcon'
import RequestsListContainer from './containers/RequestsListContainer'

export const requestsContentTypes = [
    {
        id: 'requests',
        renderButton: (_context: IContentRenderContext<IData>) => 'requests',
        renderIcon: () => <RequestsIcon/>,
        renderPane: (context: IContentRenderContext<IData>) => (
            <RequestsListContainer
                key={context.content.id}
                serverName={context.content.data!.serverName}
            />
        ),
    },
]
