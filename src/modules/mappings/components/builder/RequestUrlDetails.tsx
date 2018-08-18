import * as React from 'react'
import { FormikErrors, FormikTouched } from 'formik'
import { Select } from 'edikit'
import { IMappingFormValues } from '../../types'

interface IRequestUrlDetailsProps {
    values: IMappingFormValues
    errors: FormikErrors<IMappingFormValues>
    touched: FormikTouched<IMappingFormValues>
    onChange(e: React.ChangeEvent<any>): void
    onBlur(e: any): void
}

export default class RequestUrlDetails extends React.Component<IRequestUrlDetailsProps> {
    render() {
        const { values, onChange, onBlur } = this.props

        return (
            <React.Fragment>
                <label htmlFor="priority">
                    Priority
                </label>
                <Select
                    id="priority"
                    value={values.priority}
                    onChange={onChange}
                    onBlur={onBlur}
                >
                    <option value="auto">auto</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </Select>
                <label
                    htmlFor="urlMatchType"
                    style={{
                        gridColumnStart: 4,
                        gridColumnEnd: 6,
                    }}
                >
                    URL match type
                </label>
                <Select
                    id="urlMatchType"
                    value={values.urlMatchType}
                    onChange={onChange}
                    onBlur={onBlur}
                    style={{
                        gridColumnStart: 6,
                        gridColumnEnd: 9,
                    }}
                >
                    <option value="url">Path and query</option>
                    <option value="urlPattern">Path and query regex</option>
                    <option value="urlPath">Path</option>
                    <option value="urlPathPattern">Path regex</option>
                    <option value="anyUrl">Any URL</option>
                </Select>
            </React.Fragment>
        )
    }
}
