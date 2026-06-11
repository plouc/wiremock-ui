import * as React from 'react'
import styled from 'styled-components'
import { RefreshCw } from 'react-feather'
import { Button } from 'edikit'
import { IServer } from '../../servers'
import { IWiremockRequest } from '../types'
import RequestDetail from './RequestDetail'

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: ${props => props.theme.pane.body.background};
    ${props => props.theme.pane.body.css}
`

const Header = styled.div`
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${props => props.theme.builder.block.background};
`

const Title = styled.span`
    font-size: 12px;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
`

const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`

const AutoRefreshLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    color: ${props => props.theme.colors.textLight};
    cursor: pointer;
    user-select: none;
`

const Table = styled.div`
    flex: 1;
    overflow-y: auto;
`

const Row = styled.div<{ wasMatched: boolean }>`
    display: flex;
    align-items: center;
    padding: 8px 16px;
    cursor: pointer;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    &:hover {
        background: ${props => props.theme.colors.hover};
    }
`

const Method = styled.span`
    font-size: 11px;
    font-weight: 700;
    width: 60px;
    color: ${props => props.theme.colors.accent};
`

const Url = styled.span`
    font-size: 11px;
    flex: 1;
    color: ${props => props.theme.colors.text};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const Status = styled.span<{ wasMatched: boolean }>`
    font-size: 11px;
    font-weight: 600;
    width: 60px;
    text-align: right;
    color: ${props => props.wasMatched ? props.theme.colors.accent : '#e74c3c'};
`

const DateCell = styled.span`
    font-size: 10px;
    width: 160px;
    text-align: right;
    color: ${props => props.theme.colors.textLight};
`

const EmptyState = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.textLight};
    font-size: 12px;
`

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    z-index: 100;
`

interface IRequestsListProps {
    serverName: string
    server?: IServer
    requests: IWiremockRequest[]
    selectedRequest?: IWiremockRequest
    isLoading: boolean
    loadRequests(): void
    selectRequest(request: IWiremockRequest): void
    closeDetail(): void
}

interface IRequestsListState {
    autoRefresh: boolean
}

const AUTO_REFRESH_INTERVAL = 5000

export default class RequestsList extends React.Component<IRequestsListProps, IRequestsListState> {
    private intervalId: ReturnType<typeof setInterval> | null = null

    constructor(props: IRequestsListProps) {
        super(props)
        this.state = {
            autoRefresh: false,
        }
    }

    componentDidMount() {
        this.props.loadRequests()
    }

    componentWillUnmount() {
        this.stopAutoRefresh()
    }

    startAutoRefresh = () => {
        this.stopAutoRefresh()
        this.intervalId = setInterval(() => {
            this.props.loadRequests()
        }, AUTO_REFRESH_INTERVAL)
    }

    stopAutoRefresh = () => {
        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
        }
    }

    toggleAutoRefresh = () => {
        const next = !this.state.autoRefresh
        this.setState({ autoRefresh: next })
        if (next) {
            this.startAutoRefresh()
        } else {
            this.stopAutoRefresh()
        }
    }

    render() {
        const {
            requests,
            selectedRequest,
            isLoading,
            loadRequests,
            selectRequest,
            closeDetail,
        } = this.props
        const { autoRefresh } = this.state

        return (
            <Wrapper style={{ position: 'relative' }}>
                <Header>
                    <Title>Requests Journal</Title>
                    <HeaderActions>
                        <AutoRefreshLabel>
                            <input
                                type="checkbox"
                                checked={autoRefresh}
                                onChange={this.toggleAutoRefresh}
                            />
                            auto (5s)
                        </AutoRefreshLabel>
                        <Button
                            onClick={loadRequests}
                            variant="default"
                            icon={<RefreshCw size={14}/>}
                            style={{ padding: '4px 8px', fontSize: '11px' }}
                        >
                            refresh
                        </Button>
                    </HeaderActions>
                </Header>
                {requests.length === 0 && !isLoading && (
                    <EmptyState>No requests recorded yet</EmptyState>
                )}
                {requests.length > 0 && (
                    <Table>
                        {requests.map((req, index) => (
                            <Row
                                key={req.request.loggedDate + '-' + index}
                                wasMatched={req.wasMatched}
                                onClick={() => selectRequest(req)}
                            >
                                <Method>{req.request.method}</Method>
                                <Url>{req.request.url}</Url>
                                <Status wasMatched={req.wasMatched}>
                                    {req.wasMatched ? 'matched' : 'unmatched'}
                                </Status>
                                <DateCell>
                                    {req.request.loggedDateString}
                                </DateCell>
                            </Row>
                        ))}
                    </Table>
                )}
                {selectedRequest && (
                    <RequestDetail
                        request={selectedRequest}
                        onClose={closeDetail}
                    />
                )}
                {isLoading && <Overlay/>}
            </Wrapper>
        )
    }
}
