import * as React from 'react'
import { PlusCircle as CreateServerIcon } from 'react-feather'
import { IServer } from './types'
import { ITreeNode } from '../../impl/tree'

export const serversToTree = (servers: IServer[]): ITreeNode => ({
    id: 'root',
    type: 'root',
    label: 'servers',
    children: [
        ...servers.map(server => ({
            id: server.name,
            label: server.name,
            type: 'server',
            children: [{
                id: `${server.name}.mappings`,
                type: 'mappings',
                label: 'mappings',
                data: {
                    serverName: server.name
                },
                children: server.mappings.map(mapping => ({
                    // id isn't guaranteed to be unique
                    // and this property is used for React `key`
                    id: mapping.id,
                    type: 'mapping',
                    label: `${mapping.request.method} ${mapping.request.url}`,
                    data: {
                        serverName: server.name,
                        mappingId: mapping.id,
                    },
                }))
            }]
        })),
        {
            id: 'server.create',
            type: 'server.create',
            label: 'create server',
            icon: <CreateServerIcon size={12}/>
        },
    ]
})