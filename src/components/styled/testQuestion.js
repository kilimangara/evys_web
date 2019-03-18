import React from 'react'
import styled from 'styled-components'
import HoverPaper from '../common/HoverPaper'
import { H3, HorizontalCentered, Paper } from './common'
import { studentTheme } from '../../utils/global_theme'
import transition from 'styled-transition-group'
import AnimateHeight from 'react-animate-height'

export const AnswerBlank = styled(Paper)`
    border: ${({ selected, correct }) => {
        if (correct !== null) {
            return correct ? `8px solid ${studentTheme.ACCENT}` : `8px solid ${studentTheme.ACCENT_LIGHT}`
        } else return selected ? `8px solid ${studentTheme.PRIMARY_LIGHT}` : 'none'
    }};
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
    cursor: pointer;
`

export const QuestionBlank = styled(Paper)`
    max-width: 100%;
    min-width: 70%;
    width: fit-content;
    min-height: 200px;
    display: flex;
    align-self: center;
    flex-direction: column;
    //align-items: center;
    //justify-content: center;
    background: ${studentTheme.PRIMARY};
    border-radius: 15px;
    transition: height 400ms ease-in-out;
    will-change: height;
`

export const QuestionsBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%;
    justify-content: center;
`

export const QuestionTitle = styled(HorizontalCentered)`
    margin-top: 24px;
`

export const QuestionText = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    margin: auto 24px;
`

export const TextFade = transition.div`
    &:enter {
        opacity: 0.01;
    }
    &:enter-active {
        opacity: 1;
        transition: opacity 200ms ease-in;
    }
    &:exit {
        opacity: 1;
    }
    &:exit-active {
        opacity: 0.01;
        transition: opacity 200ms ease-out;
    }
`

export const AnimatedQuestion = styled(AnimateHeight)`
    display: flex;
    justify-content: center;

    & > div {
        display: flex;
        justify-content: center;
        width: 100%;
    }
`

export const AnswerText = styled(H3)`
    text-align: center;
`
