import { action } from 'typesafe-actions'
import { PanesActionTypes } from './types'
import { IPaneContent, PaneSplitAxis } from '../types'

export interface IInitPanesNamespaceAction {
    type: PanesActionTypes.INIT_PANES_NAMESPACE
    payload: {
        namespace: string
    }
}

export const initPanesNamespaceAction = (
    namespace: string,
) => action(
    PanesActionTypes.INIT_PANES_NAMESPACE,
    {
        namespace,
    }
)

export interface ISetCurrentPaneAction {
    type: PanesActionTypes.SET_CURRENT_PANE
    payload: {
        namespace: string
        paneId: string
    }
}

export const setCurrentPaneAction = (
    namespace: string,
    paneId: string
) => action(
    PanesActionTypes.SET_CURRENT_PANE,
    {
        namespace,
        paneId,
    }
)

export interface IAddContentToCurrentPaneAction<Data> {
    type: PanesActionTypes.ADD_CONTENT_TO_CURRENT_PANE
    payload: {
        namespace: string
        content: IPaneContent<Data>
    }
}

export const addContentToCurrentPaneAction = <Data>(
    namespace: string,
    content: IPaneContent<Data>
) => action(
    PanesActionTypes.ADD_CONTENT_TO_CURRENT_PANE,
    {
        namespace,
        content,
    }
)

export interface ISetPaneCurrentContentAction {
    type: PanesActionTypes.SET_PANE_CURRENT_CONTENT
    payload: {
        namespace: string
        paneId: string
        contentId: string
    }
}

export const setPaneCurrentContentAction = (
    namespace: string,
    paneId: string,
    contentId: string
) => action(
    PanesActionTypes.SET_PANE_CURRENT_CONTENT,
    {
        namespace,
        paneId,
        contentId,
    }
)

export interface IRemovePaneContentAction {
    type: PanesActionTypes.REMOVE_PANE_CONTENT
    payload: {
        namespace: string
        paneId: string
        contentId: string
    }
}

export const removePaneContentAction = (
    namespace: string,
    paneId: string,
    contentId: string
) => action(
    PanesActionTypes.REMOVE_PANE_CONTENT,
    {
        namespace,
        paneId,
        contentId,
    }
)

export interface IRemoveContentFromAllPanesAction {
    type: PanesActionTypes.REMOVE_CONTENT_FROM_ALL_PANES
    payload: {
        namespace: string
        contentId: string
    }
}

export const removeContentFromAllPanesAction = (
    namespace: string,
    contentId: string
) => action(
    PanesActionTypes.REMOVE_CONTENT_FROM_ALL_PANES,
    {
        namespace,
        contentId,
    }
)

export interface ISplitPaneAction {
    type: PanesActionTypes.SPLIT_PANE
    payload: {
        namespace: string
        paneId: string
        axis: PaneSplitAxis
    }
}

export const splitPaneAction = (
    namespace: string,
    paneId: string,
    axis: PaneSplitAxis
) => action(
    PanesActionTypes.SPLIT_PANE,
    {
        namespace,
        paneId,
        axis,
    }
)

export type PanesAction<Data> =
    | IInitPanesNamespaceAction
    | ISetCurrentPaneAction
    | IAddContentToCurrentPaneAction<Data>
    | ISetPaneCurrentContentAction
    | IRemovePaneContentAction
    | IRemoveContentFromAllPanesAction
    | ISplitPaneAction

export interface IPanesActions<Data> {
    initPanesNamespace: () => IInitPanesNamespaceAction
    setCurrentPane: (
        paneId: string,
    ) => ISetCurrentPaneAction
    addContentToCurrentPane: (
        content: IPaneContent<Data>
    ) => IAddContentToCurrentPaneAction<Data>
    setPaneCurrentContent: (
        paneId: string,
        contentId: string
    ) => ISetPaneCurrentContentAction
    removePaneContent: (
        paneId: string,
        contentId: string
    ) => IRemovePaneContentAction
    removeContentFromAllPanes: (
        contentId: string
    ) => IRemoveContentFromAllPanesAction
    splitPane: (
        paneId: string,
        axis: PaneSplitAxis
    ) => ISplitPaneAction
}

export const actionsFactory = <Data>(namespace: string): IPanesActions<Data> => ({
    initPanesNamespace:  () => action(
        PanesActionTypes.INIT_PANES_NAMESPACE,
        {
            namespace
        }
    ),
    setCurrentPane: (
        paneId: string
    ) => setCurrentPaneAction(
        namespace,
        paneId
    ),
    addContentToCurrentPane: (
        content: IPaneContent<Data>
    ) => addContentToCurrentPaneAction<Data>(
        namespace,
        content
    ),
    setPaneCurrentContent: (
        paneId: string,
        contentId: string
    ) => setPaneCurrentContentAction(
        namespace,
        paneId,
        contentId
    ),
    removePaneContent: (
        paneId: string,
        contentId: string
    ) => removePaneContentAction(
        namespace,
        paneId,
        contentId
    ),
    removeContentFromAllPanes: (
        contentId: string
    ) => removeContentFromAllPanesAction(
        namespace,
        contentId
    ),
    splitPane: (
        paneId: string,
        axis: PaneSplitAxis
    ) => splitPaneAction(
        namespace,
        paneId,
        axis
    ),
})
