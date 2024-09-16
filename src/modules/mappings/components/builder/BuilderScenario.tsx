import * as React from 'react'
import { Block, Input } from 'edikit'
import { FormikErrors, FormikTouched } from 'formik'
import { IMappingFormValues } from '../../types'
import BuilderSectionLabel from './BuilderSectionLabel'
import ResponseBase from './ResponseBase'
import { Grid } from './Builder_styled'

interface IBuilderScenarioProps {
    isOpened: boolean
    onToggle(): void
    values: IMappingFormValues
    errors: FormikErrors<IMappingFormValues>
    touched: FormikTouched<IMappingFormValues>
    onChange(e: React.ChangeEvent<any>): void
    onBlur(e: any): void
    sync(): void
}

export default class BuilderScenario extends React.Component<IBuilderScenarioProps> {
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
                    label="Scenario"
                    isOpened={isOpened}
                    onToggle={onToggle}
                />
                {isOpened && (
                    <Block withLink={true}>
                        <Grid>
                        <label
                            htmlFor="scenarioName"
                            style={{
                                gridColumnStart: 1,
                                gridColumnEnd: 4,
                                width: "100%"
                            }}
                        >Scenario Name</label>  
                        <Input
                            id="scenarioName"
                            value={values.scenarioName}
                            onChange={onChange}
                            onBlur={onBlur}
                            style={{
                                gridColumnStart: 1,
                                gridColumnEnd: 9,
                                width: "100%"                                
                            }}
                        />

                        <label
                            htmlFor="requiredScenarioState"
                            style={{
                                gridColumnStart: 1,
                                gridColumnEnd: 4,
                                width: "100%"                                
                            }}
                        >Required Scenario State</label>  
                        
                        <Input
                            id="requiredScenarioState"
                            value={values.requiredScenarioState}
                            onChange={onChange}
                            onBlur={onBlur}
                            style={{
                                gridColumnStart: 1,
                                gridColumnEnd: 9,
                                width: "100%"                                
                            }}
                        />

                        <label
                            htmlFor="newScenarioState"
                            style={{
                                gridColumnStart: 1,
                                gridColumnEnd: 4,
                                width: "100%"                                
                            }}
                        >New Scenario State</label>  
                        <Input
                            id="newScenarioState"
                            value={values.newScenarioState}
                            onChange={onChange}
                            onBlur={onBlur}
                            style={{
                                gridColumnStart: 1,
                                gridColumnEnd: 9,
                                width: "100%"
                            }}
                        />
                        </Grid>
                    </Block>
                )}
            </React.Fragment>
        )
    }
}
