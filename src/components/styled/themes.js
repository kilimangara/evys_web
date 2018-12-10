import React from 'react'
import styled from 'styled-components'
import {studentTheme} from "../../utils/global_theme";

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
`

export const TextInfo = styled.div`
    height: 100%;
    margin-left: 24px;
    position: relative;
`