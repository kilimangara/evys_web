import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import { CenteredContent, H2, H3, H5, Paper, RowFlexed, WithVerticalMargin } from '../components/styled/common'
import { getEvents } from '../api'
import moment from 'moment'
import './calendar-styles.css'
import { Event, EventPaper, FullWidthCalendar } from '../components/styled/notifications'
import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'
import addMonths from 'date-fns/add_months'
import withProviders from '../utils/withProviders'
import { NotificationsProvider } from '../mixins/student/NotificationsRepository'
import HoverPaper from '../components/common/HoverPaper'
import Fade from '@material-ui/core/Fade/Fade'
import Popper from '@material-ui/core/Popper/Popper'
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
                    dateTo={endOfDay(new Date())}
                    onEventClick={this.goToEvent}
                />
            </RowFlexed>
        )
    }
}

export default withProviders(NotificationsProvider)(NotificationsScreen)
