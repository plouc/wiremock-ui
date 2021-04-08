import * as React from 'react'
import { Trash2 } from 'react-feather'
import {FormikErrors, FormikTouched, FieldArray, getIn} from 'formik'
import { Button, Input, Select } from 'edikit'
import { IMappingFormValues, mappingRequestParamMatchTypes } from '../../types'

interface IRequestParamsProps {
    type: 'queryParameters' | 'requestHeaders' | 'requestCookies' | 'requestBodyPatterns'
    label: string
    values: IMappingFormValues
    errors: FormikErrors<IMappingFormValues>
    touched: FormikTouched<IMappingFormValues>
    onChange(e: React.ChangeEvent<any>): void
    onBlur(e: any): void
}

export default class RequestParams extends React.Component<IRequestParamsProps> {
    render() {
        const {
            type,
            label,
            values,
            errors,
            touched,
            onChange,
            onBlur,
        } = this.props

        return (
            <FieldArray
                name={type}
                render={arrayHelpers => (
                    <React.Fragment>
                        {values[type].map((param, index) => (
                            <React.Fragment key={param.key}>
                                {type !== 'requestBodyPatterns' && (<Input
                                    name={`${type}.${index}.key`}
                                    value={param.key}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    placeholder={`${label} key`}
                                    style={{
                                        gridColumnStart: 1,
                                        gridColumnEnd: 3,
                                    }}
                                />)}
                                <Select
                                    name={`${type}.${index}.matchType`}
                                    value={param.matchType}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    style={{
                                        gridColumnStart: type !== 'requestBodyPatterns' ? 3 : 1,
                                        gridColumnEnd: type !== 'requestBodyPatterns' ? 5 : 3,
                                    }}
                                >
                                    {mappingRequestParamMatchTypes.map(matchType => (
                                        <option key={matchType} value={matchType}>{matchType}</option>
                                    ))}
                                </Select>
                                <Input
                                    name={`${type}.${index}.value`}
                                    placeholder="expected value"
                                    value={param.value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    style={{
                                        gridColumnStart: type !== 'requestBodyPatterns' ? 5 : 3,
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
                                {getIn(errors, `${type}.${index}.key`) && getIn(touched, `${type}.${index}.key`) && (
                                    <div style={{ color: 'red', gridColumnStart: 1, gridColumnEnd: 3 }}>
                                        {getIn(errors, `${type}.${index}.key`)}
                                    </div>
                                )}
                                {getIn(errors, `${type}.${index}.value`) && getIn(touched, `${type}.${index}.value`) && (
                                    <div style={{ color: 'red', gridColumnStart: 5, gridColumnEnd: 7 }}>
                                        {getIn(errors, `${type}.${index}.value`)}
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                        <Button
                            variant="primary"
                            onClick={() => {
                                arrayHelpers.push({
                                    key: '',
                                    matchType: 'equalTo',
                                    value: '',
                                })
                            }}
                            style={{
                                gridColumnStart: 1,
                                gridColumnEnd: 3,
                                height: '30px',
                            }}
                        >
                            Add {label}
                        </Button>
                    </React.Fragment>
                )}
            />
        )
    }
}
