import {
    IPane,
    IPaneContent,
    PaneSplitAxis,
    IPanesOpertations,
} from './types'
import uuid from '../util/uuid'

export const paneOperationsFactory = <Data>(): IPanesOpertations<Data> => {
    const flattenPane = (
        pane: IPane<Data>,
        acc: Array<IPane<Data>> = []
    ): Array<IPane<Data>> => {
        const reacc = [...acc, pane]
        if (pane.children === undefined) {
            return reacc
        }

        return pane.children.reduce((a, child) => flattenPane(child, a), reacc)
    }

    return {
        addContentToCurrentPane: (rootPane: IPane<Data>, content: IPaneContent<Data>): IPane<Data> => {
            flattenPane(rootPane).forEach(pane => {
                if (pane.isCurrent) {
                    pane.contents = [
                        ...pane.contents.map(c => ({
                            ...c,
                            isCurrent: false
                        })),
                        {
                            ...content,
                            isCurrent: true,
                        }
                    ]
                }
            })

            return { ...rootPane }
        },
        setPaneCurrentContent: (rootPane: IPane<Data>, paneId: string, contentId: string): IPane<Data> => {
            const allPanes = flattenPane(rootPane)
            allPanes.forEach(pane => {
                if (pane.id === paneId) {
                    pane.isCurrent = true
                    pane.contents = pane.contents.map(c => ({
                        ...c,
                        isCurrent: c.id === contentId,
                    }))
                } else {
                    pane.isCurrent = false
                }
            })

            return { ...rootPane }
        },
        removePaneContent: (rootPane: IPane<Data>, paneId: string, contentId: string): IPane<Data> => {
            const allPanes = flattenPane(rootPane)
            let removeId: string = ''
            allPanes.forEach(pane => {
                if (pane.id === paneId) {
                    const contents = pane.contents.filter(c => c.id !== contentId)
                    const shouldRemove = contents.length === 0 && pane.id !== rootPane.id
                    if (shouldRemove) {
                        removeId = pane.id
                    } else {
                        pane.isCurrent = true
                        pane.contents = contents

                        // set last remaining content as active if there isn't any
                        const hasCurrent = pane.contents.some(c => c.isCurrent)
                        if (!hasCurrent && pane.contents.length > 0) {
                            pane.contents[pane.contents.length - 1].isCurrent = true
                        }
                    }
                } else {
                    pane.isCurrent = false
                }
            })

            if (removeId !== '') {
                allPanes.forEach(pane => {
                    if (pane.children === undefined || pane.children.length === 0) return

                    const childToRemove = pane.children.find(c => c.id === removeId)
                    if (childToRemove !== undefined) {
                        // merge panel and replace parent if one of its children has been removed
                        const remainingPane = pane.children.find(c => c.id !== removeId)
                        if (remainingPane !== undefined) {
                            pane.split = remainingPane.split
                            pane.splitAxis = remainingPane.splitAxis
                            pane.children = remainingPane.children
                            pane.contents = remainingPane.contents
                            pane.isCurrent = true
                        }
                    }
                })
            }

            return { ...rootPane }
        },
        splitPane: (rootPane: IPane<Data>, paneId: string, axis: PaneSplitAxis): IPane<Data> => {
            flattenPane(rootPane).forEach(pane => {
                if (pane.id === paneId) {
                    const { contents } = pane

                    const content = contents.find(c => c.isCurrent)
                    if (content === undefined) return

                    const childPaneAId = uuid()
                    const childPaneBId = uuid()

                    pane.isCurrent = false
                    pane.contents = []
                    pane.split = true
                    pane.splitAxis = axis
                    pane.children = [
                        {
                            id: childPaneAId,
                            contents,
                            split: false,
                            children: [],
                            isCurrent: false,
                        },
                        {
                            id: childPaneBId,
                            contents: [content],
                            split: false,
                            children: [],
                            isCurrent: true,
                        },
                    ]
                } else {
                    pane.isCurrent = false
                }
            })

            return { ...rootPane }
        }
    }
}
