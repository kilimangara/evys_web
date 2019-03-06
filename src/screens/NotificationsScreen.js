import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import { CenteredContent } from '../components/styled/common'

export class NotificationsScreen extends Component {
    getEventsFromProps = eventsArray =>
        eventsArray.map(({ expiresAt, eventObject }) => ({
            title: eventObject.name,
            start: expiresAt,
            end: expiresAt,
            allDay: true
        }))

    render() {
        const { events } = this.props
        return (
            <CenteredContent height={'100%'}>
                <BigCalendar events={this.getEventsFromProps(events)} startAccessor="start" endAccessor="end" />
            </CenteredContent>
        )
    }
}
