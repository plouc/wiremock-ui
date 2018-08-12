import { IMapping } from '../mappings'

export interface IServer {
    name: string
    url: string
    port?: number
    mappingsHaveBeenLoaded: boolean
    isLoadingMappings: boolean
    mappings: IMapping[]
}