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

class NotificationsScreen extends Component {
    state = {
        events: null
    }

    componentDidMount() {
        getEvents({ dateFrom: startOfDay(new Date()), dateTo: endOfDay(addMonths(new Date(), 1)) }).then(response =>
            this.setState({ events: response.data })
        )
    }

    handleRangeChange = dates => {
        getEvents({ dateFrom: dates.start, dateTo: dates.end }).then(response =>
            this.setState({ events: response.data })
        )
    }

    goToEvent = event => {
        console.log('ev', event)
        this.props.history.push(`course/${event.course}/themes/${event.eventObject.id}`)
    }

    getEventsFromProps = eventsArray =>
        eventsArray.map(({ expiresAt, eventObject, course }) => ({
            title: eventObject.name,
            start: expiresAt,
            end: expiresAt,
            allDay: true,
            eventObject,
            course
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
                    onRangeChange={this.handleRangeChange}
                    views={['month', 'agenda']}
                    defaultView={'agenda'}
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
                    culture={'ru'}
                />
            </CenteredContent>
        )
    }
}

export default NotificationsScreen
