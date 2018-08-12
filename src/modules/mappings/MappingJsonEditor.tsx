import * as React from 'react'
import { omit } from 'lodash'
import { withTheme } from 'styled-components'
import AceEditor from 'react-ace'
import { IMapping } from './schemas'
import { ITheme } from 'edikit'

interface IMappingJsonEditorProps {
    mapping: IMapping
    theme: ITheme
}

class MappingJsonEditor extends React.Component<IMappingJsonEditorProps> {
    render() {
        const { mapping, theme } = this.props

        const source = JSON.stringify(omit(mapping, ['index']), null, '    ')

        return (
            <AceEditor
                mode="gherkin"
                theme={theme.editor.theme}
                value={source}
                // onChange={onChange}
                name="editor"
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                editorProps={{
                    $blockScrolling: Infinity,
                }}
                fontSize={13}
                wrapEnabled={false}
                width="100%"
                height="100%"
                setOptions={{
                    showLineNumbers: true,
                    tabSize: 4,
                }}
            />
        )
    }
}

export default withTheme(MappingJsonEditor)
