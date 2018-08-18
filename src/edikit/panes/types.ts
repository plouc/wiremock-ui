import * as React from 'react'

export enum PaneSplitAxis {
    Horizontal = 'horizontal',
    Vertical   = 'vertical',
}

export interface IPaneContent<Data> {
    id: string
    type: string
    isCurrent: boolean
    isUnique: boolean
    data?: Data
}

export interface IPane<Data> {
    id: string
    isCurrent: boolean
    split: boolean
    splitAxis?: PaneSplitAxis
    childOf?: string
    children: string[]
    contents: Array<IPaneContent<Data>>
}

export interface IContentRenderContext<Data> {
    content: IPaneContent<Data>
    pane: IPane<Data>
    extra: {
        close: () => void
    }
}

export interface IContentType<Data> {
    id: string
    renderButton: (context: IContentRenderContext<Data>) => React.ReactNode
    renderIcon:   (context: IContentRenderContext<Data>) => React.ReactNode
    renderPane:   (context: IContentRenderContext<Data>) => React.ReactNode
}

