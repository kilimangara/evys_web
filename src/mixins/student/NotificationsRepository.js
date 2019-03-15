import { fetchNotifications } from '../../reducers/student/notifications'

export default superclass => class NotificationsRepository extends superclass {}

export class NotificationsProvider {
    static mapStateToProps = state => ({
        hasNotifications: state.notifications.hasNotifications
    })

    static mapDispatchToProps = {
        fetchNotifications
    }
}
