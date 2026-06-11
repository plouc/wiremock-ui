export interface IWiremockRequest {
    id: string
    request: {
        method: string
        url: string
        absoluteUrl: string
        headers: { [key: string]: string }
        body?: string
        loggedDate: number
        loggedDateString: string
    }
    response?: {
        status: number
        headers?: { [key: string]: string }
        body?: string
    }
    responseDefinition?: {
        status: number
        headers?: { [key: string]: string }
        body?: string
    }
    wasMatched: boolean
}

export interface IWiremockRequestsResponse {
    requests: IWiremockRequest[]
    meta: {
        total: number
    }
    requestJournalDisabled: boolean
}
