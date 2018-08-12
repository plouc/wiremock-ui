import {
    Tree as BaseTree,
    ITreeNode as BaseTreeNode,
    TreeClickHandler as BaseTreeClickHandler,
    TreeIconGetter as BaseTreeIconGetter,
} from 'edikit'

export interface IWithData {
    server: string
    mappingIndex?: number
}

export interface ITreeNode extends BaseTreeNode<IWithData> {}

export interface ITreeClickHandler extends BaseTreeClickHandler<IWithData> {}

export interface ITreeIconGetter extends BaseTreeIconGetter<IWithData> {}

export class Tree extends BaseTree<IWithData> {}
