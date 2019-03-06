import React from 'react'
import styled from 'styled-components'
import { studentTheme } from '../../utils/global_theme'
import { Paper } from './common'

export const CurrentCourseWrapper = styled.div`
    width: 100%;
    height: 150px;
    //margin: 36px 12px;
    font-family: ${studentTheme.FONT};
    color: ${studentTheme.TEXT_COLOR};
`

export const CurrentCourseInfo = styled.div`
    width: 100%;
    height: calc(100% - 15px);
    display: flex;
    flex-direction: row;
    padding-top: 15px;
    justify-content: space-between;
`

export const TextInfo = styled.div`
    height: 100%;
    margin-left: 24px;
    position: relative;
`

export const ProgressRingContainer = styled.div`
    width: 100px;
    height: calc(100% - 15px);
    align-items: center;
    margin-right: 30px;
    display: flex;
`

export const TextBlock = styled.div`
    width: 250px;
    height: 75px;
`

export const PercentBlock = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
    //margin: 0 35px 35px 0;
`

export const ThemeWrapper = styled.div`
    max-height: 100%;
    max-width: 100%;
    font-family: ${studentTheme.FONT};
    color: ${studentTheme.TEXT_COLOR};
    font-size: ${studentTheme.H2};
    display: flex;
    flex-direction: column;
    padding: 20px;
`

export const ThemesScreenWrapper = styled.div`
    width: 100%;
    @media screen and (min-width: 0px) and (max-width: 796px) {
        max-width: 398px;
    }
    @media screen and (min-width: 797px) and (max-width: 1194px) {
        max-width: 796px;
    }
    @media screen and (min-width: 1195px) {
        max-width: 1194px;
    }
`

export const ThemesItemWrapper = styled.div`
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

export const ThemeStudyTextBlock = styled(Paper)`
    background-color: ${studentTheme.PRIMARY_LIGHT};
    width: calc(100% - 30px);
    display: flex;
    justify-content: flex-start;
    border-radius: 15px;
    padding: 15px;
    max-width: 100%;
    font: ${studentTheme.h3} ${studentTheme.FONT};
    color: ${studentTheme.TEXT_COLOR};
    margin-bottom: 12px;
`

export const ThemeStudyTheoryItemContainer = styled(Paper)`
    background-color: ${studentTheme.PRIMARY_LIGHT};
    width: calc(100% - 40px);
    border-radius: 15px;
    display: flex;
    font: ${studentTheme.h3} ${studentTheme.FONT};
    color: ${studentTheme.TEXT_COLOR};
    align-items: center;
    padding: 10px 20px;
    height: 150px;
    margin: 12px 0;
`

export const VideoWrapper = styled.div`
    overflow: hidden;
    width: 100%;
    padding-top: calc(591.44 / 1127.34 * 100%);
    background: white;
    position: relative;
`
