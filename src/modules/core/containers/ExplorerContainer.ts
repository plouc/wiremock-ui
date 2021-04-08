import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { panesCurrentContentsSelector, uuid } from 'edikit'
import { ITreeNode } from '../components/Tree'
import { IApplicationState } from '../../../store'
import { loadServerMappings, getMappingUrl, IMapping } from '../../mappings'
import { IServer } from '../../servers'
import Explorer from '../../../../src/modules/core/components/Explorer'

const mapStateToProps = (
    {
        panes,
        servers: { servers },
        mappings: serversMappings
    }: IApplicationState
): {
    tree: ITreeNode
    servers: IServer[]
} => {
    const currentContentIds: string[] = panesCurrentContentsSelector(panes, 'default')
        .map(({ id }) => id)

    const tree: ITreeNode = {
        id: 'root',
        type: 'root',
        label: 'servers',
        children: []
    }

    servers.forEach(server => {

        const serverNode = {
            id: server.name,
            label: server.name,
            type: 'server',
            children: [] as ITreeNode[],
        }

        const mappings = serversMappings[server.name]
        if (mappings !== undefined) {
            const creationId = uuid()
            serverNode.children.push({
                id: `${server.name}.mapping.create.${creationId}`,
                type: 'mapping.create',
                label: 'create mapping',
                data: {
                    serverName: server.name,
                    creationId,
                },
            })

            const mappingsNode: ITreeNode = {
                id: `${server.name}.mappings`,
                type: 'mappings',
                label: 'mappings',
                data: {
                    serverName: server.name,
                },
                children: [],
            }
            mappings.ids.forEach(mappingId => {
                const mapping = mappings.byId[mappingId].mapping
                if (mapping !== undefined) {
                    mappingsNode.children!.push({
                        id: mappingId,
                        type: 'mapping',
                        label: mapping.name || `${mapping.request.method} ${getMappingUrl(mapping)}`,
                        isCurrent: currentContentIds.includes(mappingId),
                        data: {
                            serverName: server.name,
                            mappingId,
                        },
                    })
                }
            })
            serverNode.children.push(mappingsNode)
        }

        tree.children!.push(serverNode)
    })

    tree.children!.push({
        id: 'server.create',
        type: 'server.create',
        label: 'create server',
    })

    return { tree, servers }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadServerMappings: (server: IServer) => {
        dispatch(loadServerMappings(server))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Explorer)
