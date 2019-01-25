import React from 'react'
import styled from 'styled-components'
import HoverPaper from '../common/HoverPaper'
import { Paper } from './common'
import { studentTheme } from '../../utils/global_theme'

export const AnswerBlank = styled(Paper)`
    border: ${({ selected }) => (selected ? `3px solid ${studentTheme.ACCENT}` : '0px solid')};
    margin: 24px;
    display: flex;
    width: 33%;
    align-items: center;
    justify-content: center;
    background: ${studentTheme.PRIMARY};
    min-height: 50px;
    height: 60px;
    border-radius: 5px;
    box-sizing: border-box;
`

export const QuestionBlank = styled(Paper)`
    max-width: 100%;
    min-width: 60%;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${studentTheme.PRIMARY};
    border-radius: 15px;
`

export const QuestionsBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%;
    justify-content: center;
`

