import * as React from 'react'
import styled from 'styled-components'
import { INotification } from '../types'
import NotificationsItem from './NotificationsItem'

const Wrapper = styled.div`
    position: absolute;
    z-index: 100000;
    width: 360px;
    bottom: 32px;
    left: 32px;
`

interface INotificationsProps {
    notifications: INotification[]
}

export default class Notifications extends React.Component<INotificationsProps> {
    render() {
        const { notifications } = this.props

        return (
            <Wrapper>
                {notifications.map(notification => (
                    <NotificationsItem
                        key={notification.id}
                        notification={notification}
                    />
                ))}
            </Wrapper>
        )
    }
}
