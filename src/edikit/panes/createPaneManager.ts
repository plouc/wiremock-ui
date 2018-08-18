import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import PaneManager from './components/PaneManager'
import { actionsFactory, IPanesState } from './store'
import { IPaneContent, IContentType, PaneSplitAxis } from './types'

export default <AppState, Data>({
    namespace,
    contentTypes,
}: {
    namespace: string
    contentTypes: Array<IContentType<Data>>
}) => {
    const actions = actionsFactory<Data>(namespace)

    const mapStateToProps = ({
        panes
    }: AppState & {
        panes: IPanesState<Data>
    }) => {
        const entry = panes[namespace]

        return {
            namespace,
            root: entry === undefined ? undefined : entry.panes.find(pane => pane.childOf === undefined),
            panes: entry === undefined ? [] : entry.panes,
            contentTypes
        }
    }

    const mapDispatchToProps = (dispatch: Dispatch) => ({
        init:  () => {
            dispatch(actions.initPanesNamespace())
        },
        setCurrentPane: (paneId: string) => {
            dispatch(actions.setCurrentPane(paneId))
        },
        addContentToCurrentPane: (content: IPaneContent<Data>) => {
            dispatch(actions.addContentToCurrentPane(content))
        },
        setPaneCurrentContent: (paneId: string, contentId: string) => {
            dispatch(actions.setPaneCurrentContent(paneId, contentId))
        },
        removePaneContent: (paneId: string, contentId: string) => {
            dispatch(actions.removePaneContent(paneId, contentId))
        },
        removeContentFromAllPanes: (contentId: string) => {
            dispatch(actions.removeContentFromAllPanes(contentId))
        },
        splitPane: (paneId: string, axis: PaneSplitAxis) => {
            dispatch(actions.splitPane(paneId, axis))
        },
    })

    class NameSpacedPaneManager extends PaneManager<Data> {}

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(NameSpacedPaneManager)
}