import * as React from 'react'
import { Block } from 'edikit'
import { FormikErrors, FormikTouched } from 'formik'
import { IMappingFormValues } from '../../types'
import BuilderSectionLabel from './BuilderSectionLabel'
import ResponseBase from './ResponseBase'
import { Grid } from './Builder_styled'

interface IBuilderResponseProps {
    isOpened: boolean
    onToggle(): void
    values: IMappingFormValues
    errors: FormikErrors<IMappingFormValues>
    touched: FormikTouched<IMappingFormValues>
    onChange(e: React.ChangeEvent<any>): void
    onBlur(e: any): void
    sync(): void
}

export default class BuilderResponse extends React.Component<IBuilderResponseProps> {
    render() {
        const {
            isOpened,
            onToggle,
            values,
            errors,
            touched,
            onChange,
            onBlur,
            sync,
        } = this.props

        return (
            <React.Fragment>
                <BuilderSectionLabel
                    label="Response"
                    isOpened={isOpened}
                    onToggle={onToggle}
                />
                {isOpened && (
                    <Block withLink={true}>
                        <Grid>
                            <ResponseBase
                                values={values}
                                errors={errors}
                                touched={touched}
                                onChange={onChange}
                                onBlur={onBlur}
                                sync={sync}
                            />
                        </Grid>
                    </Block>
                )}
            </React.Fragment>
        )
    }
}
