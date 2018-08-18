import { IPane, PaneSplitAxis } from '../types'
import { PanesActionTypes } from './types'
import { PanesAction } from './actions'
import {
    setCurrentPane,
    addContentToCurrentPane,
    setPaneCurrentContent,
    removePaneContent,
    removeContentFromAllPanes,
    splitPane,
} from '../operations'

export interface IPanesNamespaceState<Data> {
    panes: Array<IPane<Data>>
}

export interface IPanesState<Data> {
    [namespace: string]: IPanesNamespaceState<Data>
}

const byNamespace = <Data>(
    state: IPanesNamespaceState<Data> = {
        panes: []
    },
    action: PanesAction<Data>
): IPanesNamespaceState<Data> => {
    switch (action.type) {
        case PanesActionTypes.INIT_PANES_NAMESPACE:
            return {
                panes: [{
                    id: action.payload.namespace,
                    isCurrent: true,
                    split: false,
                    splitAxis: PaneSplitAxis.Horizontal,
                    contents: [],
                    children: [],
                }],
            }

        case PanesActionTypes.SET_CURRENT_PANE:
            return {
                panes: setCurrentPane<Data>(
                    state.panes,
                    action.payload.paneId
                ),
            }

        case PanesActionTypes.ADD_CONTENT_TO_CURRENT_PANE:
            return {
                panes: addContentToCurrentPane<Data>(
                    state.panes,
                    action.payload.content
                ),
            }

        case PanesActionTypes.SET_PANE_CURRENT_CONTENT:
            return {
                panes: setPaneCurrentContent<Data>(
                    state.panes,
                    action.payload.paneId,
                    action.payload.contentId
                ),
            }

        case PanesActionTypes.REMOVE_PANE_CONTENT:
            return {
                panes: removePaneContent<Data>(
                    state.panes,
                    action.payload.paneId,
                    action.payload.contentId
                ),
            }

        case PanesActionTypes.REMOVE_CONTENT_FROM_ALL_PANES:
            return {
                panes: removeContentFromAllPanes<Data>(
                    state.panes,
                    action.payload.contentId
                ),
            }

        case PanesActionTypes.SPLIT_PANE:
            return {
                panes: splitPane<Data>(
                    state.panes,
                    action.payload.paneId,
                    action.payload.axis
                ),
            }

        default:
            return state
    }
}

export const panesReducer = <Data>() => (
    state: IPanesState<Data> = {},
    action: PanesAction<Data>
): IPanesState<Data> => {
    switch (action.type) {
        case PanesActionTypes.INIT_PANES_NAMESPACE:
        case PanesActionTypes.SET_CURRENT_PANE:
        case PanesActionTypes.ADD_CONTENT_TO_CURRENT_PANE:
        case PanesActionTypes.SET_PANE_CURRENT_CONTENT:
        case PanesActionTypes.REMOVE_PANE_CONTENT:
        case PanesActionTypes.REMOVE_CONTENT_FROM_ALL_PANES:
        case PanesActionTypes.SPLIT_PANE:
            return {
                ...state,
                [action.payload.namespace]: byNamespace(
                    state[action.payload.namespace],
                    action
                )
            }

        default:
            return state
    }
}

