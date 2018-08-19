import * as React from 'react'
import styled from 'styled-components'
import { IThemeColors } from '../../theming/types'
import { INotification, NotificationType } from '../types'

const colorByNotificationType = (colors: IThemeColors, type: NotificationType): string => {
    return colors[type] || colors.accent
}

interface IItemProps {
    type: NotificationType
}

const Item = styled.div<IItemProps>`
    position: relative;
    margin-top: 9px;
    font-size: 13px;
    border-radius: 1px;
    padding: 7px 12px 7px 15px;
    background: ${props => props.theme.notifications.item.background || 'transparent'};
    color: ${props => props.theme.notifications.item.color || 'inherit'};
    ${props => props.theme.notifications.item.css}
    
    &:before {
        content: "";
        position: absolute;
        width: 3px;
        top: 0;
        left: 0;
        bottom: 0;
        background: ${props => colorByNotificationType(props.theme.colors, props.type)};
    }
`

interface INotificationsItemProps {
    notification: INotification
}

export default class NotificationsItem extends React.Component<INotificationsItemProps> {
    render() {
        const { notification } = this.props

        return (
            <Item type={notification.type}>
                {notification.content}
            </Item>
        )
    }
}
