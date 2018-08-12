import * as React from 'react'
import { withTheme } from 'styled-components'
import { Container } from './Mapping_styled'
import { IMapping } from './schemas'
import MappingJsonEditor from './MappingJsonEditor'
import MappingVisualEditor from './MappingVisualEditor'

interface IMappingProps {
    mapping: IMapping
    theme: any
}

interface IMappingState {
    mode: 'visual' | 'json'
}

class Mapping extends React.Component<IMappingProps, IMappingState> {
    constructor(props: IMappingProps) {
        super(props)

        this.state = {
            mode: 'json'
        }
    }

    render() {
        const { mapping } = this.props
        const { mode } = this.state

        return (
            <Container>
                {mode === 'json' && (
                    <MappingJsonEditor mapping={mapping}/>
                )}
                {mode === 'visual' && (
                    <MappingVisualEditor mapping={mapping}/>
                )}
            </Container>
        )
    }
}

export default withTheme(Mapping)
