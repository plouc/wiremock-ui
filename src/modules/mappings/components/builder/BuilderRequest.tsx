import * as React from 'react'
import { FormikErrors, FormikTouched } from 'formik'
import { Block } from 'edikit'
import { IMappingFormValues } from '../../types'
import BuilderSectionLabel from './BuilderSectionLabel'
import RequestUrl from './RequestUrl'
import RequestUrlDetails from './RequestUrlDetails'
import RequestParamsSwitcher from './RequestParamsSwitcher'
import RequestParams from './RequestParams'
import BodyPatternParams from './BodyPatternParams'
import { Grid } from './Builder_styled'

interface IBuilderRequestProps {
    isOpened: boolean
    onToggle(): void
    values: IMappingFormValues
    errors: FormikErrors<IMappingFormValues>
    touched: FormikTouched<IMappingFormValues>
    paramsType: 'query' | 'headers' | 'cookies' | 'body'
    onChange(e: React.ChangeEvent<any>): void
    onBlur(e: any): void
    updateParamsType(paramsType: 'query' | 'headers' | 'cookies' | 'body'): void
}

export default class BuilderRequest extends React.Component<IBuilderRequestProps> {
    render() {
        const {
            isOpened,
            onToggle,
            values,
            errors,
            touched,
            onChange,
            onBlur,
            paramsType,
            updateParamsType,
        } = this.props

        return (
            <React.Fragment>
                <BuilderSectionLabel
                    label="Request"
                    isOpened={isOpened}
                    onToggle={onToggle}
                />
                {isOpened && (
                    <Block withLink={true}>
                        <Grid>
                            <RequestUrl
                                values={values}
                                errors={errors}
                                touched={touched}
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                            <RequestUrlDetails
                                values={values}
                                errors={errors}
                                touched={touched}
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                            <RequestParamsSwitcher
                                paramsType={paramsType}
                                values={values}
                                onChange={updateParamsType}
                            />
                            {paramsType === 'query' && (
                                <RequestParams
                                    type="queryParameters"
                                    label="query parameter"
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                            )}
                            {paramsType === 'headers' && (
                                <RequestParams
                                    type="requestHeaders"
                                    label="header"
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                            )}
                            {paramsType === 'cookies' && (
                                <RequestParams
                                    type="requestCookies"
                                    label="cookie"
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                            )}
                            {paramsType === 'body' && (
                                <RequestParams
                                    type="requestBodyPatterns"
                                    label="body pattern"
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                            )}
                        </Grid>
                    </Block>
                )}
            </React.Fragment>
        )
    }
}
