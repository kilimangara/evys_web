import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import { CenteredContent } from '../components/styled/common'
import { getEvents } from '../api'
import moment from 'moment'
import './calendar-styles.css'
import { Event, FullWidthCalendar } from '../components/styled/notifications'
import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'
import addMonths from 'date-fns/add_months'
import withProviders from '../utils/withProviders'
import { NotificationsProvider } from '../mixins/student/NotificationsRepository'
import HoverPaper from '../components/common/HoverPaper'
import Fade from '@material-ui/core/Fade/Fade'
import Popper from '@material-ui/core/Popper/Popper'

class NotificationsScreen extends Component {
    state = {
        events: null,
        target: null
    }
    currentView = 'agenda'

    componentDidMount() {
        this.props
            .fetchNotifications({ dateFrom: startOfDay(new Date()), dateTo: endOfDay(new Date()) })
            .then(response => this.setState({ events: response.data }))
    }

    setComponentHovered = e => {
        // debugger
        this.setState({ target: e.currentTarget })
    }

    unsetComponentHovered = () => {
        this.setState({ target: null })
    }

    renderMonthEvent = event => (
        <Event id={event.title}>
            <div onMouseEnter={e => this.setComponentHovered(e)} onMouseLeave={e => this.unsetComponentHovered(e)}>
                {event.title}
            </div>
        </Event>
    )

    handleRangeChange = dates => {
        if (this.currentView !== 'month') return
        getEvents({ dateFrom: startOfDay(dates.start), dateTo: startOfDay(dates.end) }).then(response =>
            this.setState({ events: response.data })
        )
    }

    goToEvent = event => {
        this.props.history.push(`/app/course/${event && event.course}/theme/${event && event.eventId}`)
    }

    handleNavigate = date => {
        if (this.currentView !== 'agenda') return
        getEvents({ dateFrom: startOfDay(date), dateTo: endOfDay(date) }).then(response =>
            this.setState({ events: response.data })
        )
    }

    handleViewChange = view => {
        this.currentView = view //this wouldn't work if you put it in state (or i'm an idiot)
    }

    renderAgendaEvent = event => (
        <div style={{ cursor: 'pointer' }} onClick={() => this.goToEvent(event.event)}>
            {event.title}
        </div>
    )

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
        const { events, target } = this.state
        const formEvents = (events && this.getEventsFromProps(events)) || []
        const localizer = BigCalendar.momentLocalizer(moment)
        // console.log(target)
        return (
            <CenteredContent height={'100%'}>
                <Popper id={'pop'} open={!!this.state.target} anchorEl={this.event} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <HoverPaper>123</HoverPaper>
                        </Fade>
                    )}
                </Popper>
                <FullWidthCalendar
                    events={formEvents}
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    onNavigate={this.handleNavigate}
                    onRangeChange={this.handleRangeChange}
                    onView={this.handleViewChange}
                    views={['month', 'agenda']}
                    defaultView={'agenda'}
                    length={1}
                    onSelectEvent={this.goToEvent}
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
                        },
                        month: {
                            event: this.renderMonthEvent
                        }
                    }}
                    culture={'ru'}
                />
            </CenteredContent>
        )
    }
}

export default withProviders(NotificationsProvider)(NotificationsScreen)
