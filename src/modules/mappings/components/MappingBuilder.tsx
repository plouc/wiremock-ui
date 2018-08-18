import * as React from 'react'
import { InjectedFormikProps, withFormik } from 'formik'
import * as Yup from 'yup'
import { Builder, Block, Input } from 'edikit'
import { IMapping, IMappingFormValues } from '../types'
import { mappingToFormValues, mappingFormValuesToMapping } from '../dto'
import { Container, Content } from './Mapping_styled'
import MappingBar from './MappingBar'
import { Grid } from './builder/Builder_styled'
import BuilderRequest from './builder/BuilderRequest'
import BuilderResponse from './builder/BuilderResponse'

interface IMappingBuilderProps {
    mapping: IMapping
    workingCopy: IMapping
    isFetching: boolean
    isCreating: boolean
    isUpdating: boolean
    isDeleting: boolean
    sync(values: IMapping): void
    save(values: IMapping): void
    deleteMapping(): void
    mode: 'builder' | 'json'
    setBuilderMode(): void
    setJsonMode(): void
}

interface IMappingBuilderState {
    isRequestOpened: boolean
    isResponseOpened: boolean
    requestParamsType: 'query' | 'headers' | 'cookies' | 'body'
}

const enhance = withFormik<IMappingBuilderProps, IMappingFormValues>({
    enableReinitialize: true,
    isInitialValid: true,
    mapPropsToValues: props => {
        return mappingToFormValues(props.mapping)
    },
    validationSchema: Yup.object().shape({
        method: Yup.string()
            .required('Request method is required'),
        queryParameters: Yup.array().of(Yup.object().shape({
            key: Yup.string()
                .required('Query parameter name is required'),
            value: Yup.string()
                .required('Query parameter value is required'),
        })),
        requestHeaders: Yup.array().of(Yup.object().shape({
            key: Yup.string()
                .required('Header name is required'),
            value: Yup.string()
                .required('Header value is required'),
        })),
        requestCookies: Yup.array().of(Yup.object().shape({
            key: Yup.string()
                .required('Cookie name is required'),
            value: Yup.string()
                .required('Cookie value is required'),
        })),
        responseStatus: Yup.number()
            .min(100, 'Response status code is invalid')
            .max(527, 'Response status code is invalid')
            .required('Response status code is required'),
        responseHeaders: Yup.array().of(Yup.object().shape({
            key: Yup.string()
                .required('Header name is required'),
            value: Yup.string()
                .required('Header value is required'),
        }))
    }),
    handleSubmit: (values, { props }) => {
        props.save(mappingFormValuesToMapping(values))
    }
})


class MappingBuilder extends React.Component<
    InjectedFormikProps<IMappingBuilderProps, IMappingFormValues>,
    IMappingBuilderState
> {
    constructor(props: any) {
        super(props)

        this.state = {
            isRequestOpened: true,
            isResponseOpened: true,
            requestParamsType: 'query',
        }
    }

    sync = () => {
        const { sync, values } = this.props
        sync(mappingFormValuesToMapping(values))
    }

    handleBlur = (e: React.SyntheticEvent) => {
        const { handleBlur } = this.props
        handleBlur(e)
        this.sync()
    }

    toggleRequest = () => {
        this.setState({
            isRequestOpened: !this.state.isRequestOpened
        })
    }

    toggleResponse = () => {
        this.setState({
            isResponseOpened: !this.state.isResponseOpened
        })
    }

    updateRequestParamsType = (requestParamsType: 'query' | 'headers' | 'cookies' | 'body') => {
        this.setState({ requestParamsType })
    }

    render() {
        const {
            isFetching,
            isCreating,
            isUpdating,
            isDeleting,
            deleteMapping,
            values,
            errors,
            touched,
            handleChange,
            mode,
            setBuilderMode,
            setJsonMode,
            submitForm,
            isValid,
        } = this.props
        const {
            isRequestOpened,
            isResponseOpened,
            requestParamsType,
        } = this.state

        return (
            <Container>
                <MappingBar
                    mode={mode}
                    setBuilderMode={setBuilderMode}
                    setJsonMode={setJsonMode}
                    shouldSave={true}
                    hasError={!isValid}
                    save={submitForm}
                    shouldDelete={true}
                    deleteMapping={deleteMapping}
                />
                <Content isLoading={isFetching || isCreating || isUpdating || isDeleting}>
                    <Builder>
                        <Block withLink={true}>
                            <Grid>
                                <label htmlFor="name">
                                    Name
                                </label>
                                <Input
                                    id="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={this.handleBlur}
                                    style={{
                                        gridColumnStart: 2,
                                        gridColumnEnd: 9,
                                    }}
                                />
                            </Grid>
                        </Block>
                        <BuilderRequest
                            isOpened={isRequestOpened}
                            onToggle={this.toggleRequest}
                            values={values}
                            touched={touched}
                            errors={errors}
                            onChange={handleChange}
                            onBlur={this.handleBlur}
                            paramsType={requestParamsType}
                            updateParamsType={this.updateRequestParamsType}
                        />
                        <BuilderResponse
                            isOpened={isResponseOpened}
                            onToggle={this.toggleResponse}
                            values={values}
                            touched={touched}
                            errors={errors}
                            onChange={handleChange}
                            onBlur={this.handleBlur}
                            sync={this.sync}
                        />
                    </Builder>
                </Content>
            </Container>
        )
    }
}

export default enhance(MappingBuilder)