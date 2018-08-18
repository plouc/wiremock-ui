import { connect } from 'react-redux'
import Notifications from '../components/Notifications'
import { INotification } from '../types'
import { INotificationsState } from '../store'

interface IPropsFromState {
    notifications: INotification[]
}

const mapStateToProps = (
    { notifications }: {
        notifications: INotificationsState
    } & any
): IPropsFromState => {
    return { notifications }
}

export default connect(
    mapStateToProps
)(Notifications)
