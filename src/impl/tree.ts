import {
    Tree as BaseTree,
    ITreeNode as BaseTreeNode,
    TreeClickHandler as BaseTreeClickHandler,
    TreeIconGetter as BaseTreeIconGetter,
} from 'edikit'
import { IData } from '../types'

export interface ITreeNode extends BaseTreeNode<IData> {}

export interface ITreeClickHandler extends BaseTreeClickHandler<IData> {}

export interface ITreeIconGetter extends BaseTreeIconGetter<IData> {}

export class Tree extends BaseTree<IData> {}
