import styled from 'styled-components'
import React from 'react'
import {studentTheme} from "../../utils/global_theme";

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
`;

export const CourseExpireDate = styled.div`
  margin-top: 20px;
`

