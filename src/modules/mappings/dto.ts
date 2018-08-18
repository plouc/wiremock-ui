import {
    MappingRequestUrlMatchType,
    IMapping,
    IMappingRequestParams,
    IMappingRequestBodyPattern,
    IMappingFormValues,
    IMappingRequestParamFormValue,
    IMappingRequestBodyPatternFormValue,
    IMappingResponseHeaderFormValue,
    mappingRequestParamMatchTypes,
    mappingRequestBodyPatternMatchTypes,
} from './types'

export const mappingRequestParamsToFormValue = (params?: IMappingRequestParams): IMappingRequestParamFormValue[] => {
    const formValue: IMappingRequestParamFormValue[] = []

    if (params !== undefined) {
        Object.keys(params).forEach(key => {
            const val = params[key]
            mappingRequestParamMatchTypes.forEach(matchType => {
                if (val[matchType] !== undefined) {
                    formValue.push({
                        key,
                        matchType,
                        value: matchType === 'absent' ? '' : val[matchType]!
                    })
                }
            })
        })
    }

    return formValue
}

export const mappingRequestBodyPatternsToFormValue = (bodyPatterns?: IMappingRequestBodyPattern[]): IMappingRequestBodyPatternFormValue[] => {
    const bodyPatternsFormValue: IMappingRequestBodyPatternFormValue[] = []
    if (bodyPatterns === undefined || bodyPatterns.length === 0) {
        return bodyPatternsFormValue
    }

    bodyPatterns.forEach(bodyPattern => {
        mappingRequestBodyPatternMatchTypes.forEach(matchType => {
            if (bodyPattern[matchType] !== undefined) {
                bodyPatternsFormValue.push({
                    matchType,
                    value: matchType === 'absent' ? '' : bodyPattern[matchType]!
                })
            }
        })
    })

    return bodyPatternsFormValue
}

export const mappingToFormValues = (mapping: IMapping): IMappingFormValues => {
    let url = ''
    let urlMatchType: MappingRequestUrlMatchType = 'anyUrl'
    if (mapping.request.url !== undefined) {
        url = mapping.request.url
        urlMatchType = 'url'
    } else if (mapping.request.urlPattern !== undefined) {
        url = mapping.request.urlPattern
        urlMatchType = 'urlPattern'
    } else if (mapping.request.urlPath !== undefined) {
        url = mapping.request.urlPath
        urlMatchType = 'urlPath'
    } else if (mapping.request.urlPathPattern !== undefined) {
        url = mapping.request.urlPathPattern
        urlMatchType = 'urlPathPattern'
    }

    const responseHeaders: IMappingResponseHeaderFormValue[] = []
    if (mapping.response.headers !== undefined) {
        Object.keys(mapping.response.headers).forEach(key => {
            responseHeaders.push({
                key,
                value: mapping.response.headers![key]
            })
        })
    }

    return {
        id: mapping.id,
        uuid: mapping.uuid,
        name: mapping.name,
        priority: mapping.priority !== undefined ? mapping.priority : 'auto',
        method: mapping.request.method,
        url,
        urlMatchType,
        queryParameters: mappingRequestParamsToFormValue(mapping.request.queryParameters),
        requestHeaders: mappingRequestParamsToFormValue(mapping.request.headers),
        requestCookies: mappingRequestParamsToFormValue(mapping.request.cookies),
        requestBodyPatterns: mappingRequestBodyPatternsToFormValue(mapping.request.bodyPatterns),
        responseStatus: mapping.response.status,
        responseFault: mapping.response.fault,
        responseHeaders,
        responseBody: mapping.response.body,
        responseBodyFileName: mapping.response.bodyFileName,
        responseDelayMilliseconds: mapping.response.fixedDelayMilliseconds,
        responseDelayDistribution: mapping.response.delayDistribution,
    }
}

export const mappingRequestParamsFormValueToRequestParams = (params: IMappingRequestParamFormValue[]): IMappingRequestParams => {
    return params.reduce((agg: IMappingRequestParams, param: IMappingRequestParamFormValue): IMappingRequestParams => {
        return {
            ...agg,
            [param.key]: {
                [param.matchType]: param.value,
            },
        }
    }, {})
}

export const mappingRequestBodyPatternsFormValueToBodyPatterns = (bodyPatterns: IMappingRequestBodyPatternFormValue[]): IMappingRequestBodyPattern[] => {
    return bodyPatterns.map((bodyPattern: IMappingRequestBodyPatternFormValue): IMappingRequestBodyPattern => ({
        [bodyPattern.matchType]: bodyPattern.value,
    }))
}

export const mappingFormValuesToMapping = (formValues: IMappingFormValues): IMapping => {
    let url: { [matchType: string]: string } = {}
    if (formValues.urlMatchType !== 'anyUrl') {
        url = {
            [formValues.urlMatchType]: formValues.url
        }
    }

    const mapping: IMapping = {
        id: formValues.id,
        uuid: formValues.uuid,
        name: formValues.name,
        priority: formValues.priority === 'auto' ? undefined : Number(formValues.priority),
        request: {
            method: formValues.method,
            ...url,
            queryParameters: mappingRequestParamsFormValueToRequestParams(
                formValues.queryParameters
            ),
            headers: mappingRequestParamsFormValueToRequestParams(
                formValues.requestHeaders
            ),
            cookies: mappingRequestParamsFormValueToRequestParams(
                formValues.requestCookies
            ),
            bodyPatterns: mappingRequestBodyPatternsFormValueToBodyPatterns(
                formValues.requestBodyPatterns
            ),
        },
        response: {
            status: formValues.responseStatus,
            fault: formValues.responseFault,
            body: formValues.responseBody,
            bodyFileName: formValues.responseBodyFileName,
            headers: formValues.responseHeaders.reduce((acc, header) => ({
                ...acc,
                [header.key]: header.value,
            }), {}),
            fixedDelayMilliseconds: formValues.responseDelayMilliseconds,
            delayDistribution: formValues.responseDelayDistribution,
        }
    }

    return mapping
}

export const getMappingUrl = (mapping: IMapping): string => {
    let url = '*'
    if (mapping.request.url !== undefined) {
        url = mapping.request.url
    } else if (mapping.request.urlPattern !== undefined) {
        url = mapping.request.urlPattern
    } else if (mapping.request.urlPath !== undefined) {
        url = mapping.request.urlPath
    } else if (mapping.request.urlPathPattern !== undefined) {
        url = mapping.request.urlPathPattern
    }

    return url
}

export const getMappingLabel = (mapping: IMapping): string => {
    if (mapping.name !== undefined) return mapping.name
    return `${mapping.request.method} ${getMappingUrl(mapping)}`
}