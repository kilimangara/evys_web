import React, { Component } from 'react'
import {
    AgendaButtonsBlock,
    AgendaContent,
    AgendaDates,
    AgendaHeader,
    AgendaHeaderInfo,
    EventsAgendaWrapper
} from '../styled/notifications'
import { ColoredButton } from '../styled/common'
import { studentTheme } from '../../utils/global_theme'
import { startOfDay, addDays, format, differenceInDays } from 'date-fns'

class AgendaView extends Component {
    onPrevDate = () => {
        this.props.onDateChange(
            addDays(this.props.startDate, this.props.step * -1),
            addDays(this.props.endDate, this.props.step * -1)
        )
    }

    onNextDate = () => {
        const { startDate, endDate, step } = this.props
        this.props.onDateChange(addDays(startDate, step), addDays(endDate, step))
    }

    onCurrentDate = () => {
        this.props.onDateChange(
            startOfDay(new Date()),
            addDays(startOfDay(new Date()), differenceInDays(this.props.endDate, this.props.startDate))
        )
    }

    render() {
        const { startDate, endDate } = this.props
        return (
            <EventsAgendaWrapper>
                <AgendaHeader>
                    <AgendaButtonsBlock>
                        <ColoredButton
                            color={studentTheme.ACCENT}
                            textColor={studentTheme.BACKGROUND}
                            onClick={this.onPrevDate}
                        >
                            назад
                        </ColoredButton>
                        <ColoredButton
                            color={studentTheme.ACCENT}
                            textColor={studentTheme.BACKGROUND}
                            onClick={this.onNextDate}
                        >
                            вперед
                        </ColoredButton>
                        <ColoredButton
                            color={studentTheme.ACCENT}
                            textColor={studentTheme.BACKGROUND}
                            onClick={this.onCurrentDate}
                        >
                            сегодня
                        </ColoredButton>
                    </AgendaButtonsBlock>
                    <AgendaDates>
                        {startDate &&
                            endDate &&
                            `${format(startDate, 'dd.MM.yyyy')} - ${format(endDate, 'dd.MM.yyyy')}`}
                    </AgendaDates>
                    <AgendaHeaderInfo />
                </AgendaHeader>
                <AgendaContent>{this.props.children}</AgendaContent>
            </EventsAgendaWrapper>
        )
    }
}

export default AgendaView
