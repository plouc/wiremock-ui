import * as React from 'react'
import { PlusCircle } from 'react-feather'
import { IContentRenderContext } from 'edikit'
import { IData } from '../../types'
import CreateServerContainer from './containers/CreateServerContainer'

export const serversContentTypes = [
    {
        id: 'server.create',
        renderButton: (context: IContentRenderContext<IData>) => 'create server',
        renderIcon: (context: IContentRenderContext<IData>) => <PlusCircle size={14}/>,
        renderPane: (context: IContentRenderContext<IData>) => (
            <CreateServerContainer close={context.extra.close}/>
        ),
    }
]