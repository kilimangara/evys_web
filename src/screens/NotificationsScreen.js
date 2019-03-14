import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import { CenteredContent } from '../components/styled/common'
import { getEvents } from '../api'
import moment from 'moment'
import './calendar-styles.css'
import { FullWidthCalendar } from '../components/styled/notifications'
import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'
import addMonths from 'date-fns/add_months'
import withProviders from '../utils/withProviders'
import { NotificationsProvider } from '../mixins/student/NotificationsRepository'

class NotificationsScreen extends Component {
    state = {
        events: null
    }
    currentView = 'agenda'

    componentDidMount() {
        this.props
            .fetchNotifications({ dateFrom: startOfDay(new Date()), dateTo: endOfDay(new Date()) })
            .then(response => this.setState({ events: response.data }))
    }

    handleRangeChange = dates => {
        if (this.currentView !== 'month') return
        getEvents({ dateFrom: startOfDay(dates.start), dateTo: startOfDay(dates.end) }).then(response =>
            this.setState({ events: response.data })
        )
    }

    goToEvent = event => {
        this.props.history.push(`course/${event && event.course}/themes/${event && event.eventId}`)
    }

    handleNavigate = date => {
        if (this.currentView !== 'agenda') return
        getEvents({ dateFrom: startOfDay(date), dateTo: endOfDay(date) }).then(response =>
            this.setState({ events: response.data })
        )
    }

    handleViewChange = view => {
        console.log('view', view)
        this.currentView = view //this wouldn't work if you put it in state (or i'm an idiot)
    }

    renderAgendaEvent = event => <div onClick={() => this.goToEvent(event.event)}>{event.title}</div>

    getEventsFromProps = eventsArray =>
        eventsArray.map(({ expiresAt, title, course, eventId }) => ({
            title,
            start: expiresAt,
            end: expiresAt,
            allDay: true,
            course,
            eventId
        }))

    render() {
        const { events } = this.state
        const localizer = BigCalendar.momentLocalizer(moment)
        return (
            <CenteredContent height={'100%'}>
                <FullWidthCalendar
                    events={(events && this.getEventsFromProps(events)) || []}
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    onNavigate={this.handleNavigate}
                    onRangeChange={range => setTimeout(this.handleRangeChange(range), 50)}
                    onView={this.handleViewChange}
                    views={['month', 'agenda']}
                    defaultView={'agenda'}
                    length={1}
                    onDoubleClickEvent={this.goToEvent}
                    messages={{
                        today: 'Сегодня',
                        previous: 'Назад',
                        next: 'Вперед',
                        month: 'Месяц',
                        agenda: 'Лента',
                        noEventsInRange: 'В выбранном временном отрезке отсутствуют события.',
                        date: 'Дата',
                        time: 'Время',
                        allDay: 'Весь день',
                        event: 'Событие'
                    }}
                    components={{
                        agenda: {
                            event: this.renderAgendaEvent
                        }
                    }}
                    culture={'ru'}
                />
            </CenteredContent>
        )
    }
}

export default withProviders(NotificationsProvider)(NotificationsScreen)
