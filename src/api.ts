import {IServer} from './modules/servers'

const buildApiUrl = (server: IServer, path: string): string =>
    `${server.url}${server.port ? `:${server.port}` : ''}/__admin/${path}`

export const getMappings = (server: IServer) =>
    fetch(buildApiUrl(server, '/mappings'), {
        method: 'GET',
    }).then(r => r.json())
