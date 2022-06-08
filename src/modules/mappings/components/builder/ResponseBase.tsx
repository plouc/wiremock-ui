import * as React from 'react'
import { Trash2, PlusCircle } from 'react-feather'
import { FieldArray, FormikErrors, FormikTouched, getIn } from 'formik'
import { Button, Input, Select, TextArea } from 'edikit'
import { IMappingFormValues } from '../../types'

interface IResponseBaseProps {
    values: IMappingFormValues
    errors: FormikErrors<IMappingFormValues>
    touched: FormikTouched<IMappingFormValues>
    onChange(e: React.ChangeEvent<any>): void
    onBlur(e: any): void
    sync(): void
}

export default class ResponseBase extends React.Component<IResponseBaseProps> {
    render() {
        const {
            values,
            errors,
            touched,
            onChange,
            onBlur,
            sync,
        } = this.props

        return (
            <FieldArray
                name="responseHeaders"

                render={helpers => {
                    return (
                        <React.Fragment>
                            <label
                                htmlFor="responseStatus"
                                style={{
                                    gridColumnStart: 1,
                                    gridColumnEnd: 1
                                }}
                            >
                                Status
                            </label>
                            <Input
                                id="responseStatus"
                                value={values.responseStatus}
                                onChange={onChange}
                                onBlur={onBlur}
                                style={{
                                    gridColumnStart: 2,
                                    gridColumnEnd: 2
                                }}
                            />

                            <Button
                                variant="default"
                                icon={<PlusCircle size={14}/>}
                                iconPlacement="append"
                                style={{
                                    height: '30px',
                                    gridColumnStart: 1,
                                    gridColumnEnd: 3,
                                }}
                                onClick={() => {
                                    helpers.push({ key: '', value: '' })
                                    sync()
                                }}
                            >
                                Header
                            </Button>
                            
                            {errors.responseStatus && touched.responseStatus && (
                                <div style={{ color: 'red', gridColumnStart: 6, gridColumnEnd: 9 }}>
                                    {errors.responseStatus}
                                </div>
                            )}
                            {values.responseHeaders && values.responseHeaders.length > 0 && values.responseHeaders.map((header, index) => (
                                <React.Fragment key={index}>
                                    <Input
                                        name={`responseHeaders.${index}.key`}
                                        value={header.key}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        placeholder="header name"
                                        style={{
                                            gridColumnStart: 1,
                                            gridColumnEnd: 4,
                                        }}
                                    />
                                    <Input
                                        name={`responseHeaders.${index}.value`}
                                        value={header.value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        placeholder="header value"
                                        style={{
                                            gridColumnStart: 4,
                                            gridColumnEnd: 8,
                                        }}
                                    />
                                    <div>
                                        <Button
                                            onClick={() => {
                                                helpers.remove(index)
                                                sync()
                                            }}
                                            variant="danger"
                                            icon={<Trash2 size={16}/>}
                                            style={{
                                                height: '30px',
                                            }}
                                        />
                                    </div>
                                    {getIn(errors, `responseHeaders.${index}.key`) && getIn(touched, `responseHeaders.${index}.key`) && (
                                        <div style={{ color: 'red', gridColumnStart: 1, gridColumnEnd: 4 }}>
                                            {getIn(errors, `responseHeaders.${index}.key`)}
                                        </div>
                                    )}
                                    {getIn(errors, `responseHeaders.${index}.value`) && getIn(touched, `responseHeaders.${index}.value`) && (
                                        <div style={{ color: 'red', gridColumnStart: 4, gridColumnEnd: 8 }}>
                                            {getIn(errors, `responseHeaders.${index}.value`)}
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}

                            <label
                                htmlFor="responseBody"
                                style={{
                                    gridColumnStart: 1,
                                    gridColumnEnd: 1,
                                    width: "100%"
                                }}
                            >
                                Body
                            </label>                

                            <Select
                                id="bodyType"
                                value={values.bodyType}
                                onChange={onChange}
                                onBlur={onBlur}
                                style={{
                                    gridColumnStart: 2,
                                    gridColumnEnd: 2,
                                    width: "100%"
                                }}
                            >
                                <option value="JSON">JSON</option>
                                <option value="XML">XML</option>
                            </Select>

                            {errors.responseBody && (
                                <div style={{ color: 'red', gridColumnStart: 6, gridColumnEnd: 9 }}>
                                    {errors.responseBody}
                                </div>
                            )}
                            <TextArea
                                id="responseBody"
                                value={values.responseBody}
                                onChange={onChange}
                                onBlur={onBlur}
                                style={{
                                    gridColumnStart: 1,
                                    gridColumnEnd: 9,
                                    width: "100%",
                                    height: "400px"
                                }}
                            />

                            <label
                                htmlFor="proxyBaseUrl"
                                style={{
                                    gridColumnStart: 1,
                                    gridColumnEnd: 4,
                                    width: "100%"
                                }}
                            >
                                Proxy Base Url
                            </label>  
                            <Input
                                id="proxyBaseUrl"
                                value={values.proxyBaseUrl}
                                onChange={onChange}
                                onBlur={onBlur}
                                style={{
                                    gridColumnStart: 1,
                                    gridColumnEnd: 9,
                                    width: "100%"
                                }}
                            />
                        
                        </React.Fragment>
                    )
                }}
            />
        )
    }
}
