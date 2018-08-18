import { IPane, IPaneContent } from '../types'
import { IPanesState, IPanesNamespaceState } from './reducers'

/**
 * Select panes state for a given namespace.
 */
export const panesNamespaceSelector = <Data>(
    state: IPanesState<Data>,
    namespace: string
): IPanesNamespaceState<Data> | void => state[namespace]

/**
 * Select current pane in pane collection.
 */
export const panesNsCurrentPaneSelector = <Data>(
    panes: Array<IPane<Data>>
): IPane<Data> | void => panes.find(pane => pane.isCurrent)

/**
 * Select current pane for a given namespace.
 */
export const panesCurrentPaneSelector = <Data>(
    state: IPanesState<Data>,
    namespace: string
): IPane<Data> | void => {
    const namespaceState = panesNamespaceSelector(state, namespace)
    if (namespaceState === undefined) return

    return panesNsCurrentPaneSelector(namespaceState.panes)
}

/**
 * Select a pane by its id in pane collection.
 */
export const panesNsPaneSelector = <Data>(
    panes: Array<IPane<Data>>,
    paneId: string
): IPane<Data> | void => panes.find(pane => pane.id === paneId)

/**
 * Select a pane by its id for a given namespace.
 */
export const panesPaneSelector = <Data>(
    state: IPanesState<Data>,
    namespace: string,
    paneId: string
): IPane<Data> | void => {
    const namespaceState = panesNamespaceSelector(state, namespace)
    if (namespaceState === undefined) return

    return panesNsPaneSelector(namespaceState.panes, paneId)
}

export interface IPanesContentSelection<Data> {
    pane: IPane<Data>
    content: IPaneContent<Data>
}

/**
 * Select pane & content for a given content id in pane collection.
 */
export const panesNsContentSelector = <Data>(
    panes: Array<IPane<Data>>,
    contentId: string
): IPanesContentSelection<Data> | void => {
    let selection: IPanesContentSelection<Data> | void
    panes.forEach(pane => {
        const content = pane.contents.find(c => c.id === contentId)
        if (content !== undefined) {
            selection = { pane, content }
        }
    })

    return selection!
}

/**
 * Select pane & content for a given content id in a specific namespace.
 */
export const panesContentSelector = <Data>(
    state: IPanesState<Data>,
    namespace: string,
    contentId: string
): IPanesContentSelection<Data> | void => {
    const namespaceState = panesNamespaceSelector(state, namespace)
    if (namespaceState === undefined) return

    return panesNsContentSelector(namespaceState.panes, contentId)
}

/**
 * Select all current contents in pane collection.
 */
export const panesNsCurrentContentsSelector = <Data>(
    panes: Array<IPane<Data>>
): Array<IPaneContent<Data>> => panes.reduce((
    agg: Array<IPaneContent<Data>>,
    pane: IPane<Data>
) => {
    const currentContent = pane.contents.find(content => content.isCurrent)
    if (currentContent === undefined) return agg

    const doesExist = agg.find(content => content.id === currentContent.id)
    if (doesExist) return agg

    return [...agg, currentContent]
}, [])


/**
 * Select all current contents in a specific namespace.
 */
export const panesCurrentContentsSelector = <Data>(
    state: IPanesState<Data>,
    namespace: string,
): Array<IPaneContent<Data>> => {
    const namespaceState = panesNamespaceSelector(state, namespace)
    if (namespaceState === undefined) return []

    return panesNsCurrentContentsSelector(namespaceState.panes)
}