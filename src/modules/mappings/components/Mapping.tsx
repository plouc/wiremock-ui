import * as React from 'react'
import { IServer } from '../../servers'
import { IMapping } from '../types'
import MappingJsonEditor from './MappingJsonEditor'
import MappingBuilder from './MappingBuilder'
import { Wrapper, Overlay } from './Mapping_styled'

interface IMappingProps {
    serverName:  string
    mappingId: string
    server?: IServer
    mapping?: IMapping
    isFetching: boolean
    isCreating: boolean
    isUpdating: boolean
    isDeleting: boolean
    workingCopy?: IMapping
    fetchMapping(): void
    initWorkingCopy(): void
    syncWorkingCopy(update: Partial<IMapping>): void
    updateMapping(update: IMapping): void
    deleteMapping(): void
}

interface IMappingState {
    mode: 'builder' | 'json'
}

export default class Mapping extends React.Component<IMappingProps, IMappingState> {
    constructor(props: IMappingProps) {
        super(props)

        this.state = {
            mode: 'builder'
        }
    }

    componentDidMount() {
        this.props.initWorkingCopy()
    }

    componentDidUpdate(prevProps: IMappingProps) {
        if (this.props.mappingId !== prevProps.mappingId) {
            this.props.initWorkingCopy()
        }
    }

    setBuilderMode = () => {
        this.setState({ mode: 'builder' })
    }

    setJsonMode = () => {
        this.setState({ mode: 'json' })
    }

    render() {
        const {
            mapping,
            workingCopy,
            isFetching,
            isCreating,
            isUpdating,
            isDeleting,
            syncWorkingCopy,
            updateMapping,
            deleteMapping,
        } = this.props
        const { mode } = this.state

        if (mapping === undefined || workingCopy === undefined) return null

        return (
            <Wrapper>
                {mode === 'builder' && (
                    <MappingBuilder
                        mapping={mapping}
                        workingCopy={workingCopy}
                        isFetching={isFetching}
                        isCreating={isCreating}
                        isUpdating={isUpdating}
                        isDeleting={isDeleting}
                        save={updateMapping}
                        sync={syncWorkingCopy}
                        deleteMapping={deleteMapping}
                        mode={mode}
                        setBuilderMode={this.setBuilderMode}
                        setJsonMode={this.setJsonMode}
                    />
                )}
                {mode === 'json' && (
                    <MappingJsonEditor
                        mapping={mapping}
                        workingCopy={workingCopy}
                        isFetching={isFetching}
                        isCreating={isCreating}
                        isUpdating={isUpdating}
                        save={updateMapping}
                        sync={syncWorkingCopy}
                        deleteMapping={deleteMapping}
                        mode={mode}
                        setBuilderMode={this.setBuilderMode}
                        setJsonMode={this.setJsonMode}
                    />
                )}
                {isUpdating && <Overlay/>}
            </Wrapper>
        )
    }
}
