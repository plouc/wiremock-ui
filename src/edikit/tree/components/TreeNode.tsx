import * as React from 'react'
import { withTheme } from 'styled-components'
import { Folder, ChevronRight, ChevronDown } from 'react-feather'
import { Icons, Item, CurrentIndicator } from './TreeNode_styled'
import { ITreeNode as Node, TreeClickHandler, TreeIconGetter } from '../'

const iconSize = 12

export interface ITreeNodeProps<NodeData> {
    node: Node
    openedIds: string[]
    depth: number
    theme: any
    onClick: TreeClickHandler<NodeData>
    getIcon?: TreeIconGetter<NodeData>
}

class TreeNode<NodeData> extends React.Component<ITreeNodeProps<NodeData>> {
    static defaultProps = {
        depth: 0,
    }

    handleClick = () => {
        const { onClick, node } = this.props
        onClick(node)
    }

    render() {
        const {
            node,
            openedIds,
            depth,
            onClick,
            getIcon,
            theme,
        } = this.props

        let icon = node.icon
        if (icon === undefined && getIcon !== undefined) {
            icon = getIcon(node)
        }
        if (icon === undefined && node.children !== undefined) {
            icon = (
                <Folder
                    color={theme.colors.muted}
                    size={iconSize}
                    style={{ flexShrink: 0 }}
                />
            )
        }

        const isOpened = openedIds.includes(node.id)
        const iconCount = node.children !== undefined ? 2 : 1

        return (
            <React.Fragment>
                <Item
                    isDir={!!(node.children && node.children.length > 0)}
                    isCurrent={node.isCurrent}
                    depth={depth}
                    onClick={this.handleClick}
                >
                    <Icons iconCount={iconCount}>
                        {node.children !== undefined && isOpened && (
                            <ChevronDown size={iconSize} style={{ flexShrink: 0 }} />
                        )}
                        {node.children !== undefined && !isOpened && (
                            <ChevronRight size={iconSize} style={{ flexShrink: 0 }} />
                        )}
                        {icon}
                    </Icons>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {node.label}
                    </span>
                    {node.isCurrent === true && <CurrentIndicator/>}
                </Item>
                {node.children && node.children.length > 0 && isOpened && (
                    <React.Fragment>
                        {node.children.map(child => (
                            <ThemedTreeNode
                                key={child.id}
                                node={child}
                                openedIds={openedIds}
                                onClick={onClick}
                                getIcon={getIcon}
                                depth={depth + 1}
                            />
                        ))}
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
}

const ThemedTreeNode = withTheme(TreeNode)

export default ThemedTreeNode
