import uuid from '../util/uuid'
import { IPane, IPaneContent, PaneSplitAxis } from './types'
import {
    panesNsCurrentPaneSelector,
    panesNsPaneSelector,
    panesNsContentSelector,
} from './store'

/**
 * Get a pane by its id and throw if it doesn't exist.
 */
export const mustGetPane = <Data>(
    panes: Array<IPane<Data>>,
    paneId: string
): IPane<Data> => {
    if (panes.length === 0) {
        throw new Error(`there's no available pane`)
    }

    const foundPane = panesNsPaneSelector(panes, paneId)
    if (foundPane === undefined) {
        throw new Error(`no pane found for id: ${paneId}, available panes: ${panes.map(({ id }) => id).join(', ')}`)
    }

    return foundPane
}

/**
 * Get a content by its id and throw if it doesn't exist.
 */
export const mustGetContent = <Data>(
    pane: IPane<Data>,
    contentId: string
): IPaneContent<Data> => {
    if (pane.contents.length === 0) {
        throw new Error(`pane ${pane.id} doesn't have any content`)
    }

    const foundContent = pane.contents.find(content => content.id === contentId)
    if (foundContent === undefined) {
        throw new Error(`no content found in pane: ${pane.id} for id: ${contentId}, available contents: ${pane.contents.map(({ id }) => id).join(', ')}`)
    }

    return foundContent
}

/**
 * Mark pane having provided `paneId` current pane,
 * if it's already the current one, return untouched panes.
 */
export const setCurrentPane = <Data>(
    panes: Array<IPane<Data>>,
    paneId: string
): Array<IPane<Data>> => {
    mustGetPane<Data>(panes, paneId)

    const currentPane = panesNsCurrentPaneSelector<Data>(panes)
    if (currentPane !== undefined && currentPane.id === paneId) {
        return panes
    }

    return panes.map(pane => {
        const isCurrent = pane.id === paneId
        if (pane.isCurrent === isCurrent) {
            return pane
        }

        return { ...pane, isCurrent }
    })
}

/**
 * Append a content to current pane.
 * If the content already exists, doesn't re-append.
 * If the content is unique and already exists in the existing
 * panes, doesn't re-append, and set pane/content current,
 * meaning the content will remains unique across all panes
 * in the namespace.
 */
export const addContentToCurrentPane = <Data>(
    panes: Array<IPane<Data>>,
    newContent: IPaneContent<Data>
): Array<IPane<Data>> => {
    if (newContent.isUnique) {
        const existing = panesNsContentSelector(panes, newContent.id)
        if (existing !== undefined) {
            return setPaneCurrentContent(panes, existing.pane.id, existing.content.id)
        }
    }

    const currentPane = panesNsCurrentPaneSelector<Data>(panes)
    if (currentPane === undefined) {
        throw new Error('unable to find a current pane')
    }

    const existingContent = currentPane.contents.find(
        content => content.id === newContent.id
    )
    // content already exists, make sure it's current
    if (existingContent !== undefined) {
        if (existingContent.isCurrent) return panes
        else {
            return panes.map(pane => {
                if (!pane.isCurrent) return pane
                return {
                    ...pane,
                    contents: pane.contents.map(content => {
                        const isCurrent = content.id === newContent.id
                        if (isCurrent === content.isCurrent) return content
                        return { ...content, isCurrent }
                    })
                }
            })
        }
    }

    return panes.map(pane => {
        if (!pane.isCurrent) return pane
        return {
            ...pane,
            contents: [
                ...pane.contents.map(content => {
                    if (!content.isCurrent) return content
                    return { ...content, isCurrent: false }
                }),
                {
                    ...newContent,
                    isCurrent: true
                }
            ]
        }
    })
}

/**
 * Mark pane having provided `paneId` current pane,
 * and also mark content matching provided `contentId` current content.
 * Does not touch panes/contents already in desired state.
 */
export const setPaneCurrentContent = <Data>(
    panes: Array<IPane<Data>>,
    paneId: string,
    contentId: string
): Array<IPane<Data>> => {
    const currentPane = panesNsCurrentPaneSelector<Data>(panes)
    if (currentPane !== undefined && currentPane.id === paneId) {
        const currentContent = currentPane.contents.find(
            content => content.isCurrent
        )
        if (
            currentContent !== undefined
            && currentContent.id === contentId
        ) {
            // panes are already in the desired state
            return panes
        }
    }

    const targetPane = mustGetPane<Data>(panes, paneId)
    mustGetContent<Data>(targetPane, contentId)

    return panes.map(pane => {
        if (pane.id === paneId) {
            return {
                ...pane,
                isCurrent: true,
                contents: pane.contents.map(content => {
                    const isCurrent = content.id === contentId
                    if (content.isCurrent === isCurrent) {
                        return content
                    }

                    return { ...content, isCurrent }
                })
            }
        }

        if (!pane.isCurrent) return pane
        return { ...pane, isCurrent: false }
    })
}

/**
 * Remove content from pane, if there's no remaining content
 * and pane does have a parent (childOf is defined),
 * un-split it.
 */
export const removePaneContent = <Data>(
    panes: Array<IPane<Data>>,
    paneId: string,
    contentId: string
): Array<IPane<Data>> => {
    const targetPane = mustGetPane<Data>(panes, paneId)
    mustGetContent<Data>(targetPane, contentId)

    let paneUpdate: {
        oldId: string
        pane: IPane<Data>
    }
    return panes
        .reduce((acc: Array<IPane<Data>>, pane: IPane<Data>) => {
            if (pane.id !== paneId) {
                if (!pane.isCurrent) return [...acc, pane]
                else return [...acc, { ...pane, isCurrent: false }]
            }

            const filteredContents = pane.contents.filter(
                content => content.id !== contentId
            )

            const contentCount = filteredContents.length
            if (pane.childOf === undefined || contentCount > 0) {
                let contents = filteredContents

                const hasCurrent = filteredContents.some(content => content.isCurrent)
                if (!hasCurrent) {
                    contents = filteredContents.map((content, i) => {
                        if (i === contentCount - 1) return { ...content, isCurrent: true }
                        return content
                    })
                }

                return [
                    ...acc,
                    {
                        ...pane,
                        isCurrent: true,
                        contents,
                    }
                ]
            }

            // there's no remaining content && pane isn't root pane
            // we un-split parent
            const parentPane = mustGetPane(panes, pane.childOf)
            const siblingPaneId = parentPane.children.find(
                childPaneId => childPaneId !== pane.id
            )
            const siblingPane = mustGetPane(panes, siblingPaneId!)

            paneUpdate = {
                oldId: siblingPane.id,
                pane: {
                    ...siblingPane,
                    id: parentPane.id,
                    childOf: parentPane.childOf,
                    isCurrent: true,
                },
            }

            return acc
        }, [])
        .filter((pane: IPane<Data>) =>
            paneUpdate === undefined || pane.id !== paneUpdate.oldId
        )
        .map((pane: IPane<Data>) => {
            if (paneUpdate === undefined) return pane
            if (pane.id === paneUpdate.pane.id) return paneUpdate.pane
            return {
                ...pane,
                childOf: pane.childOf === paneUpdate.oldId ?
                    paneUpdate.pane.id : pane.childOf,
                children: pane.children.map(childId =>
                    childId === paneUpdate.oldId ? paneUpdate.pane.id : childId
                ),
            }
        })
}

/**
 * Remove a content from all panes in the namespace.
 */
export const removeContentFromAllPanes = <Data>(
    panes: Array<IPane<Data>>,
    contentId: string
): Array<IPane<Data>> => {
    let updatedPanes = panes
    panes.forEach(pane => {
        if (pane.contents.some(content => content.id === contentId)) {
            updatedPanes = removePaneContent(
                panes,
                pane.id,
                contentId
            )
        }
    })

    return updatedPanes
}

/**
 * Split the pane whose id is `paneId` into two child panes,
 * also set it as current pane.
 * The new pane (second child) will be created with
 * pane current content.
 */
export const splitPane = <Data>(
    panes: Array<IPane<Data>>,
    paneId: string,
    axis: PaneSplitAxis
): Array<IPane<Data>> => {
    const targetPane = mustGetPane<Data>(panes, paneId)
    const currentContent = targetPane.contents.find(
        content => content.isCurrent
    )
    if (currentContent === undefined) return panes

    return panes.reduce((acc: Array<IPane<Data>>, pane: IPane<Data>) => {
        if (pane.id !== paneId) {
            if (!pane.isCurrent) return [...acc, pane]
            else return [...acc, { ...pane, isCurrent: false }]
        }

        const firstChildPaneId = uuid()
        const secondChildPaneBId = uuid()

        return [
            ...acc,
            {
                id: firstChildPaneId,
                contents: pane.contents,
                split: false,
                childOf: paneId,
                children: [],
                isCurrent: false,
            },
            {
                id: secondChildPaneBId,
                contents: [currentContent],
                split: false,
                childOf: paneId,
                children: [],
                isCurrent: true,
            },
            {
                ...pane,
                isCurrent: false,
                split: true,
                splitAxis: axis,
                contents: [],
                children: [
                    firstChildPaneId,
                    secondChildPaneBId,
                ]
            },
        ]
    }, [])
}