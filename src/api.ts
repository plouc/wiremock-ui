import { ajax } from 'rxjs/ajax'
import { IServer } from './modules/servers'
import { IMapping } from './modules/mappings'

const buildApiUrl = (server: IServer, path: string): string =>
    `${server.url}${server.port ? `:${server.port}` : ''}/__admin${path}`

export const getMappings = (server: IServer) =>
    ajax.getJSON(buildApiUrl(server, '/mappings'))

export const getMapping = (server: IServer, mappingId: string) =>
    ajax.getJSON(buildApiUrl(server, `/mappings/${mappingId}`))

export const createMapping = (server: IServer, mapping: Partial<IMapping>) =>
    ajax.post(
        buildApiUrl(server, '/mappings'),
        mapping,
        { 'Content-Type': 'application/json' }
    )

export const updateMapping = (server: IServer, mapping: IMapping) =>
    ajax.put(
        buildApiUrl(server, `/mappings/${mapping.id}`),
        mapping,
        { 'Content-Type': 'application/json' }
    )

export const deleteMapping = (server: IServer, mappingId: string) =>
    ajax.delete(buildApiUrl(server, `/mappings/${mappingId}`))
