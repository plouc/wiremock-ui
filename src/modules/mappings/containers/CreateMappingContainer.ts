import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { IApplicationState } from '../../../store'
import { IServer } from '../../servers'
import CreateMapping from '../components/CreateMapping'
import { IMapping } from '../types'
import {
    initCreateMapping,
    createMappingRequest,
    cancelMappingCreation,
} from '../store'

interface IOwnProps {
    serverName: string
    creationId: string
}

interface IPropsFromState {
    server?: IServer
    mapping?: IMapping
    isCreating: boolean
}

const mapStateToProps = (
    {
        servers: { servers },
        mappings: serversMappings,
    }: IApplicationState,
    {
        serverName,
        creationId,
    }: IOwnProps
): IPropsFromState => {
    const server = servers.find(s => s.name === serverName)
    if (server! === undefined) {
        throw new Error(`no server found having name: '${serverName}'`)
    }

    let mapping: IMapping | undefined
    let isCreating = false
    const serverMappings = serversMappings[serverName]
    if (serverMappings !== undefined) {
        const creation = serverMappings.creations[creationId]
        if (creation !== undefined) {
            mapping = creation.mapping
            isCreating = creation.isCreating
        }
    }

    return {
        server,
        mapping,
        isCreating,
    }
}


const mapDispatchToProps = (dispatch: Dispatch, props: IOwnProps) => ({
    init: () => {
        dispatch(initCreateMapping(
            props.serverName,
            props.creationId
        ))
    },
    save: (mapping: IMapping) => {
        dispatch(createMappingRequest(
            props.serverName,
            props.creationId,
            mapping
        ))
    },
    cancel: () => {
        dispatch(cancelMappingCreation(
            props.serverName,
            props.creationId
        ))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateMapping)
