import { ColoredIcon, ColoredText, H2, H3, Paper, RowFlexed } from '../styled/common'
import { CourseResultsBlock, CourseResultsTitle, CourseResultsWrapper, ResultBlock } from '../styled/courses'
import React from 'react'
import CheckIcon from '@material-ui/icons/check'
import { studentTheme } from '../../utils/global_theme'

const Result = ({ resultText }) => (
    <ResultBlock>
        <ColoredIcon color={studentTheme.TEXT_COLOR}>
            <CheckIcon />
        </ColoredIcon>
        <H3>{resultText}</H3>
    </ResultBlock>
)

export const CourseResults = ({ results }) => (
    <CourseResultsBlock background={studentTheme.PRIMARY} borderRadius={'5px'}>
        <CourseResultsTitle>
            <H2>Чему вы научитесь?</H2>
        </CourseResultsTitle>
        {results.map(result => (
            <Result resultText={result} />
        ))}
    </CourseResultsBlock>
)
