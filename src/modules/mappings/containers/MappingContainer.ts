import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { IApplicationState } from '../../../store'
import { IServer } from '../../servers'
import Mapping from '../components/Mapping'
import { IMapping } from '../types'
import {
    fetchMappingRequest,
    initMappingWorkingCopy,
    syncMappingWorkingCopy,
    updateMappingRequest,
    deleteMappingRequest,
    IMappingState,
} from '../store'

interface IOwnProps {
    serverName: string
    mappingId: string
}

interface IPropsFromState {
    server?: IServer
    mapping: IMapping
    workingCopy?: IMapping
    isFetching: boolean
    isCreating: boolean
    isUpdating: boolean
    isDeleting: boolean
}

const mapStateToProps = (
    {
        servers: { servers },
        mappings: serversMappings,
    }: IApplicationState,
    { serverName, mappingId }: IOwnProps
): IPropsFromState => {
    const server = servers.find(s => s.name === serverName)

    let mapping: IMappingState
    const serverMappings = serversMappings[serverName]
    if (serverMappings !== undefined) {
        mapping = serverMappings.byId[mappingId]
    }

    if (mapping! === undefined) {
        throw new Error(`no mapping found for server: '${serverName}' fot id: ${mappingId}`)
    }

    return { server, ...mapping! }
}


const mapDispatchToProps = (dispatch: Dispatch, props: IOwnProps) => ({
    fetchMapping: () => {
        dispatch(fetchMappingRequest(
            props.serverName,
            props.mappingId
        ))
    },
    initWorkingCopy: () => {
        dispatch(initMappingWorkingCopy(
            props.serverName,
            props.mappingId
        ))
    },
    syncWorkingCopy: (update: IMapping) => {
        dispatch(syncMappingWorkingCopy(
            props.serverName,
            props.mappingId,
            update
        ))
    },
    updateMapping: (mapping: IMapping) => {
        dispatch(updateMappingRequest(
            props.serverName,
            props.mappingId,
            mapping
        ))
    },
    deleteMapping: () => {
        dispatch(deleteMappingRequest(
            props.serverName,
            props.mappingId
        ))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Mapping)
