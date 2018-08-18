import * as React from 'react'
import { Container } from './Tree_styled'
import TreeNode from './TreeNode'
import { ITreeNode as Node, TreeClickHandler, TreeIconGetter } from '../'

export interface ITreeProps<NodeData> {
    root: Node<NodeData>
    onClick: TreeClickHandler<NodeData>,
    getIcon?: TreeIconGetter<NodeData>
    openedIds: string[]
}

export interface ITreeState<NodeData> {
    current?: Node<NodeData>
}

export default class Tree<NodeData> extends React.Component<ITreeProps<NodeData>, ITreeState<NodeData>> {
    render() {
        const {
            root,
            openedIds,
            onClick,
            getIcon
        } = this.props

        return (
            <Container>
                <TreeNode
                    node={root}
                    openedIds={openedIds}
                    onClick={onClick}
                    getIcon={getIcon}
                    depth={0}
                />
            </Container>
        )
    }
}
