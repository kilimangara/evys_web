import React from 'react'
import styled from 'styled-components'
import { studentTheme } from '../../utils/global_theme'
import BigCalendar from 'react-big-calendar'
import { H3, Paper, RowFlexed } from './common'

export const FullWidthCalendar = styled(BigCalendar)`
    align-self: stretch;
`

export const Event = styled.div`
    word-break: break-word;
    white-space: normal;
    position: inherit;
`

export const EventPaper = styled(Paper)`
    width: 300px;
    min-height: 200px;
    background: ${studentTheme.PRIMARY};
    border-radius: 5px;
    padding: 20px;
    margin: 0 12px 24px 12px;
`

export const EventsAgendaWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const AgendaHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`

export const AgendaContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 48px;

    @media screen and (min-width: 0px) and (max-width: ${364 * 2 + 400}px) {
        max-width: 364px;
    }
    @media screen and (min-width: ${364 * 2 + 1 + 400}px) and (max-width: ${364 * 3 + 400}px) {
        max-width: ${364 * 2}px;
    }
    @media screen and (min-width: ${364 * 3 + 1 + 400}px) and (max-width: ${364 * 4 + 400}px) {
        max-width: ${364 * 3}px;
    }
    @media screen and (min-width: ${364 * 4 + 1 + 400}px) {
        max-width: ${364 * 4}px;
    }
`

export const AgendaButtonsBlock = styled(RowFlexed)`
    display: flex;
    flex: 1;

    > * {
        margin: 0 8px;
        width: 80px;
    }
`

export const AgendaDates = styled(H3)`
    justify-content: center;
    align-items: center;
    display: flex;
    flex: 3;
`

export const AgendaHeaderInfo = styled.div`
    display: flex;
    flex: 1;
`
