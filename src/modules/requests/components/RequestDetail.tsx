import * as React from 'react'
import styled from 'styled-components'
import { X as CloseIcon } from 'react-feather'
import { Button } from 'edikit'
import { IWiremockRequest } from '../types'

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Dialog = styled.div`
    width: 80%;
    max-width: 700px;
    max-height: 80%;
    overflow-y: auto;
    background: ${props => props.theme.pane.body.background};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 4px;
    display: flex;
    flex-direction: column;
`

const DialogHeader = styled.div`
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    background: ${props => props.theme.builder.block.background};
`

const DialogTitle = styled.span`
    font-size: 12px;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
`

const DialogBody = styled.div`
    padding: 16px;
    overflow-y: auto;
    flex: 1;
`

const Section = styled.div`
    margin-bottom: 16px;
`

const SectionTitle = styled.div`
    font-size: 11px;
    font-weight: 700;
    color: ${props => props.theme.colors.accent};
    margin-bottom: 8px;
    text-transform: uppercase;
`

const KeyValue = styled.div`
    display: flex;
    padding: 4px 0;
    font-size: 11px;
    border-bottom: 1px solid ${props => props.theme.colors.border};
`

const Key = styled.span`
    width: 180px;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
`

const Value = styled.span`
    flex: 1;
    color: ${props => props.theme.colors.textLight};
    word-break: break-all;
`

const BodyBlock = styled.pre`
    font-size: 11px;
    font-family: monospace;
    background: ${props => props.theme.colors.border};
    padding: 8px;
    border-radius: 3px;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-all;
    color: ${props => props.theme.colors.text};
`

interface IRequestDetailProps {
    request: IWiremockRequest
    onClose(): void
}

export default class RequestDetail extends React.Component<IRequestDetailProps> {
    handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            this.props.onClose()
        }
    }

    render() {
        const { request, onClose } = this.props
        const { request: req, response, responseDefinition, wasMatched } = request
        const resp = response || responseDefinition

        return (
            <Backdrop onClick={this.handleBackdropClick}>
                <Dialog>
                    <DialogHeader>
                        <DialogTitle>
                            {req.method} {req.url}
                        </DialogTitle>
                        <Button
                            onClick={onClose}
                            style={{ padding: '4px' }}
                            variant="default"
                            icon={<CloseIcon size={14}/>}
                        />
                    </DialogHeader>
                    <DialogBody>
                        <Section>
                            <SectionTitle>Request</SectionTitle>
                            <KeyValue>
                                <Key>Method</Key>
                                <Value>{req.method}</Value>
                            </KeyValue>
                            <KeyValue>
                                <Key>URL</Key>
                                <Value>{req.url}</Value>
                            </KeyValue>
                            <KeyValue>
                                <Key>Absolute URL</Key>
                                <Value>{req.absoluteUrl}</Value>
                            </KeyValue>
                            <KeyValue>
                                <Key>Date</Key>
                                <Value>{req.loggedDateString}</Value>
                            </KeyValue>
                            <KeyValue>
                                <Key>Matched</Key>
                                <Value>{wasMatched ? 'Yes' : 'No'}</Value>
                            </KeyValue>
                        </Section>

                        {req.headers && Object.keys(req.headers).length > 0 && (
                            <Section>
                                <SectionTitle>Request Headers</SectionTitle>
                                {Object.entries(req.headers).map(([key, value]) => (
                                    <KeyValue key={key}>
                                        <Key>{key}</Key>
                                        <Value>{value}</Value>
                                    </KeyValue>
                                ))}
                            </Section>
                        )}

                        {req.body && (
                            <Section>
                                <SectionTitle>Request Body</SectionTitle>
                                <BodyBlock>{req.body}</BodyBlock>
                            </Section>
                        )}

                        {resp && (
                            <Section>
                                <SectionTitle>Response</SectionTitle>
                                <KeyValue>
                                    <Key>Status</Key>
                                    <Value>{resp.status}</Value>
                                </KeyValue>
                                {resp.headers && Object.entries(resp.headers).map(([key, value]) => (
                                    <KeyValue key={key}>
                                        <Key>{key}</Key>
                                        <Value>{value}</Value>
                                    </KeyValue>
                                ))}
                            </Section>
                        )}

                        {resp && resp.body && (
                            <Section>
                                <SectionTitle>Response Body</SectionTitle>
                                <BodyBlock>{resp.body}</BodyBlock>
                            </Section>
                        )}
                    </DialogBody>
                </Dialog>
            </Backdrop>
        )
    }
}
