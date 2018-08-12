import * as React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { ThemeProvider } from 'styled-components'
import themes from '../../impl/themes'
import { getMappings } from '../../api'
import { walkTree } from 'edikit'
import { ISettings, register as registerSettingsModule } from '../settings'
import { serversToTree, IServer, register as registerServerModule } from '../servers'
import { IMappingCollection, register as registerMappingsModule } from '../mappings'
import App from './App'
import { PaneManager } from '../../impl/pane'
import { ITreeNode, IWithData } from '../../impl/tree'
import { IApplicationState } from '../../store'

interface IAppContainerProps {
    store: Store<IApplicationState>
}

interface IAppContainerState {
    servers: IServer[]
    settings: ISettings
    tree: ITreeNode
    openedTreeNodeIds: string[]
    currentTreeNodeIds: string[]
}

export default class AppContainer extends React.Component<IAppContainerProps, IAppContainerState> {
    readonly paneManager: PaneManager

    constructor(props: IAppContainerProps) {
        super(props)

        let servers: IServer[] = []
        let savedServers = localStorage.getItem('servers')
        if (savedServers) {
            savedServers = JSON.parse(savedServers)
            if (Array.isArray(savedServers)) {
                servers = savedServers.map(s => ({
                    ...s,
                    mappingsHaveBeenLoaded: false,
                    isLoadingMappings: false,
                    mappings: []
                }))
            }
        }

        this.paneManager = new PaneManager()
        registerSettingsModule(this, this.paneManager)
        registerServerModule(this, this.paneManager)
        registerMappingsModule(this, this.paneManager)

        this.state = {
            settings: {
                theme: localStorage.getItem('theme') || 'solarized dark',
            },
            servers,
            tree: serversToTree(servers),
            openedTreeNodeIds: [],
            currentTreeNodeIds: [],
        }
    }

    componentDidMount() {
        this.paneManager.addCurrentPaneContent({
            id: 'server.create',
            type: 'server.create',
            isCurrent: true
        })
    }

    addServer = (server: Pick<IServer, 'name' | 'url' | 'port'>) => {
        const servers = [
            ...this.state.servers,
            {
                ...server,
                mappingsHaveBeenLoaded: false,
                isLoadingMappings: false,
                mappings: []

            }
        ]

        localStorage.setItem('servers', JSON.stringify(servers.map(s => ({
            name: s.name,
            url: s.url,
            port: s.port,
        }))))

        const tree = walkTree<IWithData>(this.state.tree, n => n.type === 'servers', n => {
            return {
                ...n,
                children: [
                    ...n.children!,
                    {
                        id: server.name,
                        label: server.name,
                        type: 'server',
                        isOpened: false,
                        children: [{
                            id: `${server.name}.mappings`,
                            type: 'mappings',
                            label: 'mappings',
                            isOpened: false,
                            data: {
                                server: server.name
                            },
                            children: []
                        }]
                    }
                ]
            }
        })

        this.setState({
            servers,
            tree
        })
    }

    loadMappings = (server: IServer) => {
        this.setState({
            servers: this.state.servers.map(s => {
                if (s.name === server.name) {
                    return { ...s, isLoadingMappings: true }
                }

                return s
            })
        })

        getMappings(server).then((mappings: IMappingCollection) => {
            const servers = this.state.servers.map(s => {
                if (s.name === server.name) {
                    return {
                        ...s,
                        isLoadingMappings: false,
                        mappingsHaveBeenLoaded: true,
                        mappings: mappings.mappings.map((m, index) => ({
                            ...m,
                            index
                        }))
                    }
                }

                return s
            })

            const tree = walkTree<IWithData>(
                this.state.tree,
       n => (n.type === 'mappings' && n.data!.server === server.name), n => {
                return {
                    ...n,
                    children: mappings.mappings.map((mapping, i) => ({
                        // id isn't guaranteed to be unique
                        // and this property is used for React `key`
                        id: `${mapping.id}.${i}`,
                        type: 'mapping',
                        label: `${mapping.request.method} ${mapping.request.url}`,
                        data: {
                            server: server.name,
                            mappingIndex: i
                        },
                    }))
                }
            })

            this.setState({
                servers,
                tree
            })
        })
    }

    handleTreeClick = (node: ITreeNode) => {
        if (node.type === 'server.create') {
            this.paneManager.addCurrentPaneContent({
                id: 'server.create',
                type: 'server.create',
                isCurrent: true,
            })
        }

        if (node.type === 'mappings' && node.data !== undefined) {
            const server = this.state.servers.find(s => s.name === node.data!.server)
            if (server !== undefined) {
                if (!server.mappingsHaveBeenLoaded && !server.isLoadingMappings) {
                    this.loadMappings(server)
                }
            }
        }

        if (node.type === 'mapping' && node.data !== undefined) {
            const server = this.state.servers.find(s => s.name === node.data!.server)
            if (server !== undefined) {
                this.paneManager.addCurrentPaneContent({
                    id: node.id,
                    type: 'mapping',
                    isCurrent: true,
                    data: {
                        server: server.name,
                        mappingIndex: node.data.mappingIndex
                    }
                })
            }
        }

        let openedTreeNodeIds
        if (this.state.openedTreeNodeIds.includes(node.id)) {
            openedTreeNodeIds = this.state.openedTreeNodeIds.filter(id => id !== node.id)
        } else {
            openedTreeNodeIds = [...this.state.openedTreeNodeIds, node.id]
        }

        this.setState({
            openedTreeNodeIds
        })
    }

    defineSetting = (key: string, value: any) => {
        localStorage.setItem(key, value)
        this.setState({
            settings: {
                ...this.state.settings,
                [key]: value,
            },
        })
    }

    render() {
        const { store } = this.props
        const {
            tree,
            openedTreeNodeIds,
            currentTreeNodeIds,
            settings
        } = this.state

        return (
            <Provider store={store}>
                <ThemeProvider theme={themes[settings.theme]}>
                    <App
                        tree={tree}
                        openedTreeNodeIds={openedTreeNodeIds}
                        currentTreeNodeIds={currentTreeNodeIds}
                        onTreeClick={this.handleTreeClick}
                        paneManager={this.paneManager}
                    />
                </ThemeProvider>
            </Provider>
        )
    }
}
