import * as React from 'react'
import { Button } from 'edikit'
import styled from 'styled-components'
import {
    Save as SaveIcon,
    Code as JsonModeIcon,
    Grid as BuilderModeIcon,
    Trash2 as DeleteIcon,
    // AlertOctagon as HasErrorIcon,
    // X as CancelIcon,
    // Copy as CloneIcon,
} from 'react-feather'

const Container = styled.div`
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${props => props.theme.builder.block.background};
`

const ButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
`

const actionButtonStyle = {
    fontSize: '11px',
    lineHeight: '1.6em',
    height: '32px',
    width: '32px',
    alignItems: 'center',
    padding: 0,
    justifyContent: 'center',
    marginLeft: '6px',
}

interface IMappingBarProps {
    mode: 'builder' | 'json'
    setBuilderMode(): void
    setJsonMode(): void
    shouldSave: boolean
    shouldDelete: boolean
    hasError: boolean
    save(): void
    deleteMapping(): void
}

export default class MappingBar extends React.Component<IMappingBarProps> {
    static defaultProps = {
        shouldSave: true,
        shouldDelete: false,
        hasError: false,
        save: () => { return },
    }

    render() {
        const {
            mode,
            setBuilderMode,
            setJsonMode,
            shouldSave,
            save,
            shouldDelete,
            deleteMapping,
        } = this.props

        return (
            <Container>
                <ButtonsWrapper>
                    <Button
                        onClick={setBuilderMode}
                        style={{
                            paddingLeft: '6px',
                            fontSize: '12px',
                            lineHeight: '1.6em',
                        }}
                        variant={mode === 'builder' ? 'primary' : 'default'}
                        icon={<BuilderModeIcon size={14} style={{ marginRight: '9px' }}/>}
                    >
                        builder
                    </Button>
                    <Button
                        onClick={setJsonMode}
                        style={{
                            marginLeft: '6px',
                            paddingLeft: '6px',
                            fontSize: '12px',
                            lineHeight: '1.6em',
                        }}
                        variant={mode === 'json' ? 'primary' : 'default'}
                        icon={<JsonModeIcon size={14} style={{ marginRight: '9px' }}/>}
                    >
                        json
                    </Button>
                </ButtonsWrapper>
                <ButtonsWrapper>
                    {shouldSave && (
                        <Button
                            onClick={save}
                            style={actionButtonStyle}
                            variant="primary"
                            icon={<SaveIcon size={16}/>}
                        />
                    )}
                    {shouldDelete && (
                        <Button
                            onClick={deleteMapping}
                            style={actionButtonStyle}
                            variant="danger"
                            icon={<DeleteIcon size={16}/>}
                        />
                    )}
                    {/*
                    <Button
                        style={actionButtonStyle}
                        variant="primary"
                        icon={<CloneIcon size={14}/>}
                    />
                    <Button
                        style={actionButtonStyle}
                        variant="warning"
                        icon={<CancelIcon size={16}/>}
                    />
                    */}
                </ButtonsWrapper>
            </Container>
        )
    }
}
