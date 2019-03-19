import React from 'react'
import styled from 'styled-components'
import { studentTheme } from '../../utils/global_theme'
import BigCalendar from 'react-big-calendar'
import HoverPaper from '../common/HoverPaper'

export const FullWidthCalendar = styled(BigCalendar)`
    align-self: stretch;
`

export const Event = styled.div`
    word-break: break-word;
    white-space: normal;
    position: inherit;
`
