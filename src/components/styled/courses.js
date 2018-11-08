import styled from 'styled-components'
import React from 'react'
import { studentTheme } from '../../utils/global_theme'

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
    color: ${studentTheme.TEXT_COLOR};
    font-family: ${studentTheme.FONT};
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
  justify-content: center;
`

export const CourseWrapper = styled.div`
    width: 350px;
    height: 300px;
    margin: 12px;
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
    ;display: flex;
    flex-wrap: wrap;
`
