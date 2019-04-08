import React, { Component } from 'react'
import { RowFlexed } from '../components/styled/common'
import './calendar-styles.css'
import startOfDay from 'date-fns/startOfDay'
import addDays from 'date-fns/addDays'
import withProviders from '../utils/withProviders'
import { NotificationsProvider } from '../mixins/student/NotificationsRepository'
import EventsAgendaView from '../components/Notifications/EventsAgendaView'

class NotificationsScreen extends Component {
    state = {
        events: null,
        target: null
    }

    render() {
        return (
            <RowFlexed>
                <EventsAgendaView
                    dateFrom={startOfDay(new Date())}
                    dateTo={startOfDay(addDays(new Date(), 1))}
                    onEventClick={this.goToEvent}
                />
            </RowFlexed>
        )
    }
}

export default withProviders(NotificationsProvider)(NotificationsScreen)
