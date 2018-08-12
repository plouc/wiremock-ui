import * as React from 'react'
import { withTheme } from 'styled-components'
import { Server as ServerIcon } from 'react-feather'
import { Tree, ITreeNode, ITreeClickHandler } from '../../impl/tree'
import { ITheme } from 'edikit'

export interface ISidebarProps {
    tree: ITreeNode
    openedTreeNodeIds: string[]
    currentTreeNodeIds: string[]
    onTreeClick: ITreeClickHandler
    theme: ITheme
}

class Sidebar extends React.Component<ISidebarProps> {
    getTreeNodeIcon = (node: ITreeNode): React.ReactNode => {
        const { theme } = this.props
        if (node.type === 'server') {
            return <ServerIcon size={12} color={theme.colors.accent}/>
        }

        if (node.type === 'mapping') {
            return <span style={{
                fontWeight: 900,
                fontSize: '11px',
                color: theme.colors.accent
            }}>M</span>
        }

        return
    }

    render() {
        const {
            tree: treeData,
            openedTreeNodeIds,
            currentTreeNodeIds,
            onTreeClick,
        } = this.props

        return (
            <Tree
                root={treeData}
                openedIds={openedTreeNodeIds}
                currentIds={currentTreeNodeIds}
                getIcon={this.getTreeNodeIcon}
                onClick={onTreeClick}
            />
        )
    }
}

export default withTheme(Sidebar)
