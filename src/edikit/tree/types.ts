import * as React from 'react'

export interface ITreeNode<Data=any> {
    id: string
    type: string
    label: string
    icon?: React.ReactNode
    isCurrent?: boolean
    data?: Data
    children?: Array<ITreeNode<Data>>
}

export type TreeIconGetter<Data> = (node: ITreeNode<Data>) => React.ReactNode

export type TreeClickHandler<Data> = (node: ITreeNode<Data>) => void
