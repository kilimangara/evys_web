import React, { Component } from 'react'
import { AgendaHeader, EventPaper, EventsAgendaWrapper } from '../styled/notifications'
import { ColoredButton, H3, H5, RowFlexed, WithVerticalMargin } from '../styled/common'
import AgendaView from '../common/AgendaView'
import { getEvents } from '../../api'
import { startOfDay, endOfDay } from 'date-fns'
import withProviders from '../../utils/withProviders'
import { NotificationsProvider } from '../../mixins/student/NotificationsRepository'
import { withRouter } from 'react-router'

class EventsAgendaView extends Component {
    state = {
        dateFrom: this.props.dateFrom,
        dateTo: this.props.dateTo,
        events: null
    }

    componentDidMount() {
        this.props
            .fetchNotifications({ dateFrom: startOfDay(new Date()), dateTo: endOfDay(new Date()) })
            .then(response => this.setState({ events: response.data }))
    }

    onDateChange = (dateFrom, dateTo) => {
        this.setState({ dateFrom, dateTo })
        getEvents({ dateFrom, dateTo }).then(response => this.setState({ events: response.data }))
    }

    goToEvent = event => {
        this.props.history.push(`/app/course/${event && event.course}/theme/${event && event.eventId}`)
    }

    render() {
        const { dateFrom, dateTo, events } = this.state
        return (
            <EventsAgendaWrapper>
                <AgendaView startDate={dateFrom} endDate={dateTo} onDateChange={this.onDateChange} step={1}>
                    {events &&
                        events.map(event => (
                            <EventPaper key={event.title} clickable onClick={() => this.goToEvent(event)}>
                                <WithVerticalMargin margin={'20px'}>
                                    <H3>{event.title}</H3>
                                </WithVerticalMargin>
                                <H5>
                                    Тестовое описание будет находиться здесь, пока его не заменит поле описания с
                                    сервера. Importantly, custom Hooks give you the power to constrain React API if
                                    you’d like to type them more strictly in some way. React gives you the primitives,
                                    but you can combine them in different ways than what we provide out of the box.
                                </H5>
                            </EventPaper>
                        ))}
                </AgendaView>
            </EventsAgendaWrapper>
        )
    }
}

export default withProviders(NotificationsProvider)(withRouter(EventsAgendaView))
