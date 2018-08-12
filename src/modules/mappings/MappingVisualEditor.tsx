import * as React from 'react'
import { IMapping } from './schemas'

interface IMappingVisualEditorProps {
    mapping: IMapping
}

class MappingVisualEditor extends React.Component<IMappingVisualEditorProps> {
    render() {
        const { mapping } = this.props

        return (
            <div>
                {mapping.request.method} {mapping.request.url}
            </div>
        )
    }
}

export default MappingVisualEditor
