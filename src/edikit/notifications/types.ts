import { ReactNode } from 'react'

export type NotificationType = 'default' | 'success' | 'warning' | 'danger'

export interface INotification {
    id: string
    type: NotificationType
    content: ReactNode
    ttl?: number
    timer?: NodeJS.Timer
}
