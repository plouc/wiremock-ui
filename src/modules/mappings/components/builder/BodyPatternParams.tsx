import * as React from 'react'
import { Trash2 } from 'react-feather'
import {FormikErrors, FormikTouched, FieldArray, getIn} from 'formik'
import { Button, Input, Select } from 'edikit'
import { IMappingFormValues, mappingRequestParamMatchTypes } from '../../types'

interface IRequestParamsProps {
    values: IMappingFormValues
    errors: FormikErrors<IMappingFormValues>
    touched: FormikTouched<IMappingFormValues>
    onChange(e: React.ChangeEvent<any>): void
    onBlur(e: any): void
}

export default class BodyPatternParams extends React.Component<IRequestParamsProps> {
    render() {
        const {
            values,
            errors,
            touched,
            onChange,
            onBlur,
        } = this.props

        return (
            <FieldArray
                name={'body patterns'}
                render={arrayHelpers => (
                    <React.Fragment>
                        {values['requestBodyPatterns'].map((param, index) => (
                            <React.Fragment key={index}>
                                <Select
                                    name={`$bodyParams.${index}.matchType`}
                                    value={param.matchType}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    style={{
                                        gridColumnStart: 1,
                                        gridColumnEnd: 3,
                                    }}
                                >
                                    {mappingRequestParamMatchTypes.map(matchType => (
                                        <option key={matchType} value={matchType}>{matchType}</option>
                                    ))}
                                </Select>
                                <Input
                                    name={`$bodyParams.${index}.value`}
                                    placeholder="expected value"
                                    value={param.value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    style={{
                                        gridColumnStart: 3,
                                        gridColumnEnd: 8,
                                    }}
                                />
                                <div>
                                    <Button
                                        onClick={() => { arrayHelpers.remove(index) }}
                                        variant="danger"
                                        icon={<Trash2 size={14}/>}
                                        style={{
                                            height: '30px',
                                        }}
                                    />
                                </div>
                                {getIn(errors, `$bodyParams.${index}`) && getIn(touched, `$bodyParams.${index}`) && (
                                    <div style={{ color: 'red', gridColumnStart: 1, gridColumnEnd: 3 }}>
                                        {getIn(errors, `$bodyParams.${index}`)}
                                    </div>
                                )}
                                {getIn(errors, `$bodyParams.${index}`) && getIn(touched, `$bodyParams.${index}`) && (
                                    <div style={{ color: 'red', gridColumnStart: 5, gridColumnEnd: 7 }}>
                                        {getIn(errors, `$bodyParams.${index}`)}
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                        <Button
                            variant="primary"
                            onClick={() => {
                                // tslint:disable-next-line:no-console
                                console.log(values['requestBodyPatterns'])
                                arrayHelpers.push({
                                    key: '',
                                    matchType: 'equalTo',
                                    value: '',
                                })
                                arrayHelpers.pop()
                                // tslint:disable-next-line:no-console
                                console.log(arrayHelpers)
                            }}
                            style={{
                                gridColumnStart: 1,
                                gridColumnEnd: 3,
                                height: '30px',
                            }}
                        >
                            Add Body Pattern
                        </Button>
                    </React.Fragment>
                )}
            />
        )
    }
}
