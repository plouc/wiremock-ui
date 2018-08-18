import { set } from 'lodash'
import { ITreeNode } from './'

export function walkTree<NodeData> (
    node: ITreeNode<NodeData>,
    predicate: (node: ITreeNode<NodeData>) => boolean,
    fn: (node: ITreeNode) => ITreeNode<NodeData>,
    path: string = '',
    accc?: ITreeNode<NodeData>
): ITreeNode<NodeData> {
    const acc = accc || { ...node }

    let newNode = node
    if (predicate(node)) {
        newNode = fn(node)
        if (path === '') return newNode
    }

    set(acc, path === '' ? '.' : path, newNode)

    if (node.children !== undefined) {
        node.children.forEach((child, i: number) => {
            walkTree(child, predicate, fn, `${path}children[${i}]`, acc)
        })
    }

    return acc
}
