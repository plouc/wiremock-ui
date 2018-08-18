import * as React from 'react'
import { Button } from 'edikit'
import { IMappingFormValues } from '../../types'

interface IRequestParamsSwitcherProps {
    paramsType: 'query' | 'headers' | 'cookies' | 'body'
    values: IMappingFormValues
    onChange(paramsType: 'query' | 'headers' | 'cookies' | 'body'): void
}

export default class RequestParamsSwitcher extends React.Component<IRequestParamsSwitcherProps> {
    render() {
        const {
            paramsType,
            values,
            onChange,
        } = this.props

        return (
            <React.Fragment>
                <Button
                    variant={paramsType === 'query' ? 'primary' : 'default'}
                    onClick={() => { onChange('query') }}
                    style={{
                        gridColumnStart: 1,
                        gridColumnEnd: 3,
                        height: '30px',
                    }}
                >
                    Query params
                    {values.queryParameters.length > 0 ? ` [${values.queryParameters.length}]` : ''}
                </Button>
                <Button
                    variant={paramsType === 'headers' ? 'primary' : 'default'}
                    onClick={() => { onChange('headers') }}
                    style={{
                        gridColumnStart: 3,
                        gridColumnEnd: 5,
                        height: '30px',
                    }}
                >
                    Headers
                    {values.requestHeaders.length > 0 ? ` [${values.requestHeaders.length}]` : ''}
                </Button>
                <Button
                    variant={paramsType === 'cookies' ? 'primary' : 'default'}
                    onClick={() => { onChange('cookies') }}
                    style={{
                        gridColumnStart: 5,
                        gridColumnEnd: 7,
                        height: '30px',
                    }}
                >
                    Cookies
                    {values.requestCookies.length > 0 ? ` [${values.requestCookies.length}]` : ''}
                </Button>
                <Button
                    variant={paramsType === 'body' ? 'primary' : 'default'}
                    onClick={() => { onChange('body') }}
                    style={{
                        gridColumnStart: 7,
                        gridColumnEnd: 9,
                        height: '30px',
                    }}
                >
                    Body
                    {values.requestBodyPatterns.length > 0 ? ` [${values.requestBodyPatterns.length}]` : ''}
                </Button>
            </React.Fragment>
        )
    }
}
