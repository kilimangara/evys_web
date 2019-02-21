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
    height: 135px;
    flex-direction: row;
    padding-top: 15px;
`

export const TextInfo = styled.div`
    width: 250px;
    height: 100%;
    margin-left: 24px;
    position: relative;
`
export const ProgressRingContainer = styled.div`
    width: 60px;
    height: 60px;
    margin-left: 12px;
`

export const SubjectPriceContainer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100px;
    margin: 0 15px 20px 0;
`

export const CourseName = styled.p`
    overflow: hidden;
    margin: 0;
    text-overflow: ellipsis;
    font-size: ${studentTheme.H1};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`

export const CourseExpireDate = styled.div`
    position: absolute;
    bottom: 18px;
`

export const CoursesScreenContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
`

export const CourseWrapper = styled.div`
    position: relative;
    width: 350px;
    height: 300px;
    margin: 36px 12px;
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

export const OutdatedWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 5;
    left: 0;
    top: 0;
    background-color: rgba(50, 50, 50, 0.5);
`

export const OutdatedText = styled.div`
    position: inherit;
    bottom: 16px;
    left: 24px;
    color: ${studentTheme.ACCENT_LIGHT};
`

export const GrayscaleContent = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    filter: ${({ isOn }) => (isOn ? 'grayscale(100%)' : '')};
`
