import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import { CenteredContent } from '../components/styled/common'
import { getEvents } from '../api'
import moment from 'moment'
import './calendar-styles.css'

class NotificationsScreen extends Component {
    state = {
        events: null
    }

    componentDidMount() {
        getEvents().then(response => console.log('AE', response))
    }

    handleRangeChange = dates => {
        console.log('FUCK', dates)
    }

    getEventsFromProps = eventsArray =>
        eventsArray.map(({ expiresAt, eventObject }) => ({
            title: eventObject.name,
            start: expiresAt,
            end: expiresAt,
            allDay: true
        }))

    render() {
        const { events } = this.props
        const localizer = BigCalendar.momentLocalizer(moment)
        return (
            <CenteredContent height={'100%'}>
                <BigCalendar
                    events={(events && this.getEventsFromProps(events)) || []}
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    onRangeChange={this.handleRangeChange}
                    views={['month', 'agenda']}
                    defaultView={'agenda'}
                    messages={{ today: 'Сегодня', previous: 'Назад', next: 'Вперед', month: 'Месяц', agenda: 'Лента' }}
                    culture={'ru'}
                />
            </CenteredContent>
        )
    }
}

export default NotificationsScreen
