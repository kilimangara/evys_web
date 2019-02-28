import { BorderedImage, ColoredButton, H1, H2, H3, Paper, WithCustomMargin } from '../styled/common'
import React from 'react'
import { getPrice } from '../subjects/SubjectItem'
import { studentTheme } from '../../utils/global_theme'
import { BuyCourseButton, CardInfoPrice, CourseContentInfo, CourseInfoCardBlock } from '../styled/courses'
import { declOfNum } from '../../utils/utilFunctions'

export const CourseInfoCard = ({ courseImage, amount, currency, duration, locale, themes, videos }) => (
    <CourseInfoCardBlock width={'25%'} borderRadius={'5px'} background={studentTheme.PRIMARY}>
        <CardInfoPrice>{getPrice(amount, currency, duration, locale)}</CardInfoPrice>
        <BuyCourseButton color={studentTheme.ACCENT} textColor={studentTheme.BACKGROUND}>
            купить
        </BuyCourseButton>
        <CourseContentInfo>
            <H2>Что входит в курс?</H2>
            {videos > 0 && <H3>{videos} видео</H3>}
            <H3>
                {themes} {declOfNum(themes, ['тема', 'темы', 'тем'])}
            </H3>
        </CourseContentInfo>
    </CourseInfoCardBlock>
)
