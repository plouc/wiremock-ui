export interface IMapping {
    id: string
    uuid: string
    index: number
    priority?: number
    request: {
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD'
        url: string
        headers?: {
            [key: string]: string
        }
    }
    response?: {
        body?: string
        headers?: {
            [key: string]: string
        }
        status?: number
    }
}

export interface IMappingCollection {
    mappings: IMapping[]
    meta: {
        total: number
    }
}