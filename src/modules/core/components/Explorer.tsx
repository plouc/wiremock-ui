import * as React from 'react'
import { withTheme } from 'styled-components'
import { Server as ServerIcon, PlusCircle } from 'react-feather'
import {IPaneContent, ITheme} from 'edikit'
import { Tree, ITreeNode } from '../../../impl/tree'
import { IData } from '../../../types'
import { IServer } from '../../servers'
import MapingIcon from '../../mappings/components/MappingIcon'

export interface IExplorerProps {
    tree: ITreeNode
    servers: IServer[]
    loadServerMappings(server: IServer): void
    addContentToCurrentPane(content: IPaneContent<IData>): void
    theme: ITheme
}

export interface IExplorerState {
    openedIds: string[]
}

class Explorer extends React.Component<IExplorerProps, IExplorerState> {
    constructor(props: IExplorerProps) {
        super(props)

        this.state = {
            openedIds: ['root'],
        }
    }

    getTreeNodeIcon = (node: ITreeNode): React.ReactNode => {
        const { theme } = this.props
        if (node.type === 'server') {
            return <ServerIcon size={12} color={theme.colors.accent}/>
        }

        if (node.type === 'server.create' || node.type === 'mapping.create') {
            return <PlusCircle size={14} color={theme.colors.accent}/>
        }

        if (node.type === 'mapping') {
            return <MapingIcon/>
        }

        return
    }

    handleNodeClick = (node: ITreeNode) => {
        const {
            loadServerMappings,
            servers,
            addContentToCurrentPane,
        } = this.props

        if (node.type === 'server.create') {
            addContentToCurrentPane({
                id: 'server.create',
                type: 'server.create',
                isCurrent: true,
                isUnique: true,
            })
        }

        if (node.type === 'mappings' && node.data !== undefined) {
            const server = servers.find(s => s.name === node.data!.serverName)
            if (server !== undefined) {
                loadServerMappings(server)
            }
        }

        if (node.type === 'mapping' && node.data !== undefined) {
            const server = servers.find(s => s.name === node.data!.serverName)
            if (server !== undefined) {
                addContentToCurrentPane({
                    id: node.id,
                    type: 'mapping',
                    isCurrent: true,
                    isUnique: false,
                    data: {
                        serverName: server.name,
                        mappingId: node.data.mappingId,
                    }
                })
            }
        }

        if (node.type === 'server.create') {
            addContentToCurrentPane({
                id: 'server.create',
                type: 'server.create',
                isCurrent: true,
                isUnique: true,
            })
        }

        let openedIds
        if (this.state.openedIds.includes(node.id)) {
            openedIds = this.state.openedIds.filter(id => id !== node.id)
        } else {
            openedIds = [...this.state.openedIds, node.id]
        }

        this.setState({
            openedIds
        })
    }

    render() {
        const { tree } = this.props
        const { openedIds } = this.state

        return (
            <Tree
                root={tree}
                openedIds={openedIds}
                getIcon={this.getTreeNodeIcon}
                onClick={this.handleNodeClick}
            />
        )
    }
}

export default withTheme(Explorer)
