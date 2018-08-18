import { IPaneContent, PaneSplitAxis } from '../types'
import { PanesActionTypes } from './types'
import {
    initPanesNamespaceAction,
    setCurrentPaneAction,
    addCurrentPaneContentAction,
    setPaneCurrentContentAction,
    removePaneContentAction,
    splitPaneAction,
} from './actions'

describe('initPanesNamespaceAction', () => {
    it('should return corresponding action', () => {
        expect(initPanesNamespaceAction('namespace')).toEqual({
            type: PanesActionTypes.INIT_PANES_NAMESPACE,
            payload: {
                namespace: 'namespace',
            }
        })
    })
})

describe('setCurrentPaneAction', () => {
    it('should return corresponding action', () => {
        expect(setCurrentPaneAction('namespace', 'pane_id')).toEqual({
            type: PanesActionTypes.SET_CURRENT_PANE,
            payload: {
                namespace: 'namespace',
                paneId: 'pane_id',
            }
        })
    })
})

describe('addCurrentPaneContentAction', () => {
    it('should return corresponding action', () => {
        const content: IPaneContent<any> = {
            id: 'content_id',
            type: 'test',
            isCurrent: false
        }
        expect(addCurrentPaneContentAction('namespace', content)).toEqual({
            type: PanesActionTypes.ADD_CURRENT_PANE_CONTENT,
            payload: {
                namespace: 'namespace',
                content
            }
        })
    })
})

describe('removePaneContentAction', () => {
    it('should return corresponding action', () => {
        expect(removePaneContentAction('namespace', 'pane_id', 'content_id')).toEqual({
            type: PanesActionTypes.REMOVE_PANE_CONTENT,
            payload: {
                namespace: 'namespace',
                paneId: 'pane_id',
                contentId: 'content_id',
            }
        })
    })
})

describe('setPaneCurrentContentAction', () => {
    it('should return corresponding action', () => {
        expect(setPaneCurrentContentAction('namespace', 'pane_id', 'content_id')).toEqual({
            type: PanesActionTypes.SET_PANE_CURRENT_CONTENT,
            payload: {
                namespace: 'namespace',
                paneId: 'pane_id',
                contentId: 'content_id',
            }
        })
    })
})

describe('splitPaneAction', () => {
    it('should return corresponding action', () => {
        expect(splitPaneAction('namespace', 'pane_id', PaneSplitAxis.Horizontal)).toEqual({
            type: PanesActionTypes.SPLIT_PANE,
            payload: {
                namespace: 'namespace',
                paneId: 'pane_id',
                axis: PaneSplitAxis.Horizontal,
            }
        })
    })
})
