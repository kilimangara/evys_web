import styled from 'styled-components'
import React from 'react'
import { studentTheme } from '../../utils/global_theme'
import Tabs from '@material-ui/core/Tabs/Tabs'
import Tab from '@material-ui/core/Tab/Tab'

export const CourseImage = styled.img`
    height: 50%;
    width: 100%;
`

export const CourseInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    padding-top: 30px;
`

export const TextInfo = styled.div`
    width: 250px;
    height: 100%;
    margin-left: 15px;
`

export const CourseName = styled.div`
    width: 100%;
    white-space: nowrap;
    overflow: visible;
    text-overflow: ellipsis;
    font-size: ${studentTheme.H1};
`

export const CourseExpireDate = styled.div`
    margin-top: 20px;
`

export const CoursesScreenContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const CourseWrapper = styled.div`
    width: 350px;
    height: 300px;
    margin: 12px;
    font-family: ${studentTheme.FONT};
    color: ${studentTheme.TEXT_COLOR};
`

export const CoursesTab = styled(Tab)`
    color: ${studentTheme.TEXT_COLOR};
`

export const CoursesTabs = styled(Tabs)`
    width: 100%;
    & > div > div > span {
        background-color: ${studentTheme.ACCENT};
    }
`

export const CoursesWrapper = styled.div`
    @media screen and (min-width: 0px) and (max-width: 1090px) {
        max-width: 374px;
    }
    @media screen and (min-width: 1090px) and (max-width: 1422px) {
        max-width: 748px;
    }
    @media screen and (min-width: 1422px) and (max-width: 1796px) {
        max-width: 1122px;
    }
    @media screen and (min-width: 1796px) {
        max-width: 1496px;
    }
    width: 5000px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
`
