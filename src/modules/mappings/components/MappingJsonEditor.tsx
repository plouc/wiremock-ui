import * as React from 'react'
import { withTheme } from 'styled-components'
import AceEditor from 'react-ace'
import { ITheme } from 'edikit'
import { IMapping } from '../types'
import { Container, Content } from './Mapping_styled'
import MappingBar from './MappingBar'

interface IMappingJsonEditorProps {
    mapping: IMapping
    workingCopy: IMapping
    isFetching: boolean
    isCreating: boolean
    isUpdating: boolean
    sync(values: IMapping): void
    save(values: IMapping): void
    deleteMapping(): void
    mode: 'builder' | 'json'
    setBuilderMode(): void
    setJsonMode(): void
    theme: ITheme
}

class MappingJsonEditor extends React.Component<IMappingJsonEditorProps> {
    render() {
        const {
            workingCopy,
            isFetching,
            isCreating,
            isUpdating,
            mode,
            setBuilderMode,
            setJsonMode,
            deleteMapping,
            theme,
        } = this.props

        const source = JSON.stringify(workingCopy, null, '    ')

        return (
            <Container>
                <MappingBar
                    mode={mode}
                    setBuilderMode={setBuilderMode}
                    setJsonMode={setJsonMode}
                    shouldSave={false}
                    shouldDelete={true}
                    deleteMapping={deleteMapping}
                />
                <Content isLoading={isFetching || isCreating || isUpdating}>
                    <AceEditor
                        mode="json"
                        theme={theme.editor.theme}
                        value={source}
                        readOnly={true}
                        name="editor"
                        showPrintMargin={false}
                        showGutter={true}
                        highlightActiveLine={true}
                        editorProps={{
                            $blockScrolling: Infinity,
                        }}
                        fontSize={12}
                        wrapEnabled={false}
                        width="100%"
                        height="100%"
                        setOptions={{
                            showLineNumbers: true,
                            tabSize: 4,
                        }}
                    />
                </Content>
            </Container>
        )
    }
}

export default withTheme(MappingJsonEditor)
