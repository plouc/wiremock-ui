import * as React from 'react'
import { InjectedFormikProps, withFormik } from 'formik'
import { Builder, Block, Input,Select  } from 'edikit'
import { IMapping, IMappingFormValues } from '../types'
import { mappingValidationSchema } from '../validation'
import { mappingToFormValues, mappingFormValuesToMapping } from '../dto'
import { Container, Content } from './Mapping_styled'
import MappingBar from './MappingBar'
import { Grid } from './builder/Builder_styled'
import BuilderRequest from './builder/BuilderRequest'
import BuilderResponse from './builder/BuilderResponse'

interface IMappingBuilderProps {
    mapping: IMapping
    isLoading: boolean
    sync?: (values: IMapping) => void
    save(values: IMapping): void
    deleteMapping?: () => void
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
    validationSchema: mappingValidationSchema,
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
        if (sync !== undefined) {
            sync(mappingFormValuesToMapping(values))
        }
    }

    handleBlur = (e: React.SyntheticEvent) => {
        const { handleBlur, sync } = this.props
        handleBlur(e)
        if (sync !== undefined) this.sync()
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
            isLoading,
            deleteMapping,
            values,
            errors,
            touched,
            handleChange,
            mode,
            setBuilderMode,
            setJsonMode,
            submitForm,
            save
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
                    save={() => {
                        save(mappingFormValuesToMapping(values))}}
                    deleteMapping={deleteMapping}
                />
                <Content isLoading={isLoading}>
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
                                <label htmlFor="persistent">
                                    persistent
                                </label>
                                <Select
                                        id="bodyType"
                                        value={values.bodyType}
                                        onChange={handleChange}
                                        style={{
                                            gridColumnStart: 2,
                                            gridColumnEnd: 2,
                                            width: "100%"
                                        }}
                                    >
                                    <option value="true">true</option>
                                    <option value="false">false</option>
                                </Select>
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