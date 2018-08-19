import * as React from 'react'
import { IMapping } from '../types'
import MappingJsonEditor from './MappingJsonEditor'
import MappingBuilder from './MappingBuilder'
import { Wrapper, Overlay } from './Mapping_styled'

interface ICreateMappingProps {
    serverName: string
    creationId: string
    mapping?: IMapping
    isCreating: boolean
    init(): void
    save(mapping: IMapping): void
    cancel(): void
}

interface ICreateMappingState {
    mode: 'builder' | 'json'
}

export default class CreateMapping extends React.Component<ICreateMappingProps, ICreateMappingState> {
    constructor(props: ICreateMappingProps) {
        super(props)

        this.state = {
            mode: 'builder',
        }
    }

    componentDidMount() {
        this.props.init()
    }

    setBuilderMode = () => {
        this.setState({ mode: 'builder' })
    }

    setJsonMode = () => {
        this.setState({ mode: 'json' })
    }

    render() {
        const {
            creationId,
            mapping,
            isCreating,
            save,
        } = this.props

        if (mapping === undefined) return null

        const { mode } = this.state

        return (
            <Wrapper>
                {mode === 'builder' && (
                    <MappingBuilder
                        mapping={mapping}
                        isLoading={isCreating}
                        save={save}
                        mode={mode}
                        setBuilderMode={this.setBuilderMode}
                        setJsonMode={this.setJsonMode}
                    />
                )}
                {mode === 'json' && (
                    <MappingJsonEditor
                        mapping={mapping}
                        isLoading={isCreating}
                        save={save}
                        mode={mode}
                        setBuilderMode={this.setBuilderMode}
                        setJsonMode={this.setJsonMode}
                    />
                )}
                {isCreating && <Overlay/>}
            </Wrapper>
        )
    }
}
