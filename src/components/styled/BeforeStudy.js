import React from 'react'
import styled from 'styled-components'
import { studentTheme } from '../../utils/global_theme'
import { H2, H3 } from './common'

export const CardName = styled(H2)`
    display: flex;
    width: 100%;
    color: ${studentTheme.TEXT_COLOR};
    justify-content: center;
    margin-top: 15px;
`

export const BeforeStudyWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const CardsBlock = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-top: 24px;
`

export const IconsBlock = styled.div`
    margin-top: 24px;
`

export const ThemeNameBlock = styled.div`
    margin-top: 24px;
    display: flex;
    width: 100%;
    justify-content: center;
    color: ${studentTheme.TEXT_COLOR};
`
