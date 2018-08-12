import * as React from 'react'
import styled from 'styled-components'
import { Formik, FormikProps } from 'formik'
import { ArrowRight, Slash } from 'react-feather'
import * as Yup from 'yup'
import { Button, Input, Builder, BuilderLabel, Block } from 'edikit'
import { Container, Title } from './CreateServer_styled'
import { IServer } from '../types'

interface IFormValues {
    name: string
    url: string
    port: string
}

export interface ICreateServerProps {
    addServer: (server: Pick<IServer, 'name' | 'url' | 'port'>) => void
}

const Form = styled.div`
    max-width: 500px;
`

const Label = styled.label`
    font-size: 12px;
    margin-bottom: 5px;
    display: block;
    color: ${props => props.theme.colors.accent};
`

const SubGrid = styled.div`
    display: grid;
    grid-template-columns: 4fr 1fr;
    grid-row-gap: 18px;
    grid-column-gap: 24px;
    align-items: top;
`

const withLink = true

class CreateServer extends React.Component<ICreateServerProps> {
    render() {
        const { addServer } = this.props

        return (
            <Builder
                title="Mock Builder"
                subtitle="19047fd7-73ee-3bb8-8a5a-20e7bd16ddef"
            >
                <BuilderLabel withLink={withLink}>
                    Request
                </BuilderLabel>
                <Block title="Request" withLink={withLink}>
                    <Block title="Request" withLink={withLink}>
                        content
                    </Block>
                    <Block title="Request" withLink={withLink}>
                        content
                    </Block>
                </Block>
                <Block title="Other" withLink={withLink}/>
                <BuilderLabel withLink={withLink}>
                    Body
                </BuilderLabel>
                <Block title="Body" withLink={withLink}>
                    <Block title="Body">
                        content
                    </Block>
                </Block>
            </Builder>
        )

        return (
            <Container>
                <Form>
                    <Title>Create new server</Title>
                    <Formik
                        initialValues={{
                            name: '',
                            url: '',
                            port: '',
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string()
                                .min(1)
                                .max(256)
                                .required(),
                            url: Yup.string()
                                .matches(
                                    /^https?:\/\/(((www\.)?[a-zA-Z0-9._]{2,}\.[a-z]{2,6})|localhost|([0-9]{1,3}\.){3}[0-9]{1,3})$/,
                                    'Invalid URL'
                                )
                                .required(),
                            port: Yup.number()
                                .min(1)
                                .max(65535)
                        })}
                        onSubmit={(values: IFormValues) => {
                            addServer({
                                ...values,
                                port: values.port !== '' ? Number(values.port) : undefined
                            })
                        }}
                        render={({
                             values,
                             isValid,
                             errors,
                             touched,
                             handleChange,
                             handleBlur,
                             handleSubmit,
                         }: FormikProps<IFormValues>) => (
                            <SubGrid>
                                <div style={{
                                    gridColumnStart: 1,
                                    gridColumnEnd: 3
                                }}>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="e.g. default server"
                                    />
                                    {errors.name && touched.name && (
                                        <div style={{color: 'red', marginTop: '.5rem'}}>
                                            {errors.name}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="url">URL</Label>
                                    <Input
                                        id="url"
                                        name="url"
                                        type="text"
                                        value={values.url}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="e.g. http://localhost"
                                    />
                                    {errors.url && touched.url && (
                                        <div style={{color: 'red', marginTop: '.5rem'}}>
                                            {errors.url}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="port">Port</Label>
                                    <Input
                                        id="port"
                                        name="port"
                                        type="text"
                                        value={values.port}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.port && touched.port && (
                                        <div style={{color: 'red', marginTop: '.5rem'}}>
                                            {errors.port}
                                        </div>
                                    )}
                                </div>
                                <div style={{
                                    gridColumnStart: 2,
                                    gridColumnEnd: 3,
                                    justifySelf: 'end'
                                }}>
                                    <Button
                                        label="CREATE"
                                        variant={isValid ? 'primary' : 'default'}
                                        onClick={handleSubmit}
                                        icon={isValid ?
                                            <ArrowRight size={16} style={{marginLeft: 9}}/> :
                                            <Slash size={16} style={{marginLeft: 9}}/>
                                        }
                                        iconPlacement="append"
                                    />
                                </div>
                            </SubGrid>
                        )}
                    />
                </Form>
            </Container>
        )
    }
}

export default CreateServer