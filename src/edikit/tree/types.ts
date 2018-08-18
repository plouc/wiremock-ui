import * as React from 'react'

export interface ITreeNode<NodeData=any> {
    id: string
    type: string
    label: string
    icon?: React.ReactNode
    children?: Array<ITreeNode<NodeData>>
    data?: NodeData
}

export type TreeIconGetter<NodeData> = (node: ITreeNode<NodeData>) => React.ReactNode

export type TreeClickHandler<NodeData> = (node: ITreeNode<NodeData>) => void
