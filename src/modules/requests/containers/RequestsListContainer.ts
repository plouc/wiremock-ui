import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { IApplicationState } from '../../../store'
import { IServer } from '../../servers'
import RequestsList from '../components/RequestsList'
import { IWiremockRequest } from '../types'
import {
    loadServerRequests,
    selectRequest,
    closeRequestDetail,
} from '../store'

interface IOwnProps {
    serverName: string
}

interface IPropsFromState {
    server?: IServer
    requests: IWiremockRequest[]
    selectedRequest?: IWiremockRequest
    isLoading: boolean
}

const mapStateToProps = (
    {
        servers: { servers },
        requests: serverRequests,
    }: IApplicationState,
    { serverName }: IOwnProps
): IPropsFromState => {
    const server = servers.find(s => s.name === serverName)
    const serverRequestState = serverRequests[serverName]

    return {
        server,
        requests: serverRequestState ? serverRequestState.requests : [],
        selectedRequest: serverRequestState ? serverRequestState.selectedRequest : undefined,
        isLoading: serverRequestState ? serverRequestState.isLoading : false,
    }
}

// We need a merged props approach to access server from state in dispatch
const mergeProps = (
    stateProps: IPropsFromState,
    dispatchProps: any,
    ownProps: IOwnProps
) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    loadRequests: () => {
        if (stateProps.server) {
            dispatchProps.dispatch(loadServerRequests(stateProps.server))
        }
    },
})

const mapDispatchToPropsRaw = (dispatch: Dispatch, props: IOwnProps) => ({
    dispatch,
    selectRequest: (request: IWiremockRequest) => {
        dispatch(selectRequest(props.serverName, request))
    },
    closeDetail: () => {
        dispatch(closeRequestDetail(props.serverName))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToPropsRaw,
    mergeProps
)(RequestsList as any)
