import * as React from 'react'
import { Block, Input } from 'edikit'
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

const TextArea = (props: any) => (
  <textarea
    {...props}
    style={{
      width: '100%',
      minHeight: '160px',
      resize: 'vertical',
      padding: '8px 10px',
      borderRadius: '4px',
      border: '1px solid rgba(0,0,0,0.15)',
      fontFamily: 'monospace',
      fontSize: '12px',
      boxSizing: 'border-box',
    }}
  />
)

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
        <BuilderSectionLabel label="Response" isOpened={isOpened} onToggle={onToggle} />
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

              <div style={{ gridColumnStart: 1, gridColumnEnd: 9 }}>
                <div style={{ fontSize: 12, marginBottom: 6, opacity: 0.8 }}>Body (text)</div>
                <TextArea
                  name="responseBody"
                  value={values.responseBody || ''}
                  onChange={onChange}
                  onBlur={(e: any) => {
                    onBlur(e)
                    sync()
                  }}
                  placeholder="Ví dụ: JSON/XML/text hoặc Handlebars template..."
                />
              </div>

              <div style={{ gridColumnStart: 1, gridColumnEnd: 9 }}>
                <div style={{ fontSize: 12, marginBottom: 6, opacity: 0.8 }}>
                  bodyFileName (tuỳ chọn)
                </div>
                <Input
                  name="responseBodyFileName"
                  value={values.responseBodyFileName || ''}
                  onChange={onChange}
                  onBlur={(e: any) => {
                    onBlur(e)
                    sync()
                  }}
                  placeholder="Ví dụ: los/CheckAvailableLimitRS.xml"
                />
                <div style={{ fontSize: 11, opacity: 0.7, marginTop: 6, lineHeight: 1.4 }}>
                  Nếu bạn nhập <code>bodyFileName</code> thì WireMock sẽ đọc nội dung từ thư mục
                  <code> __files</code> trong mounted path.
                </div>
              </div>
            </Grid>
          </Block>
        )}
      </React.Fragment>
    )
  }
}
