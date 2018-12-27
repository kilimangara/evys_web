import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import HoverPaper from '../common/HoverPaper'
import { studentTheme } from '../../utils/global_theme'
import { PercentBlock, TextBlock, ThemeWrapper } from '../styled/themes'

const getThemeItemBoxShadow = percent => {
    if (percent <= 33) {
        return '-10px 10px 0px 0px #36363698, -20px 20px 0px 0px #34343498, -30px 30px 0px 0px #32323298'
    } else if (percent > 33 && percent <= 66) {
        return '-10px 10px 0px 0px #36363698, -20px 20px 0px 0px #34343498'
    } else if (percent > 66 && percent < 100) {
        return '-10px 10px 0px 0px #36363698'
    } else return ''
}

export const ThemeItem = ({ alias, percent, onClick }) => (
    <HoverPaper
        width={'350px'}
        height={'150px'}
        background={
            percent === 100
                ? `linear-gradient(to right, ${studentTheme.THEME_ACTIVE_GRADIENT_LEFT}, ${
                      studentTheme.THEME_ACTIVE_GRADIENT_RIGHT
                  })`
                : `linear-gradient(to right, ${studentTheme.THEME_GRADIENT_LEFT}, ${studentTheme.THEME_GRADIENT_RIGHT})`
        }
        borderRadius={'15px'}
        boxShadow={getThemeItemBoxShadow(percent)}
        style={{ margin: '24px' }}
        onClick={onClick}
    >
        <ThemeWrapper>
            <TextBlock>{alias}</TextBlock>
            <PercentBlock>{percent}%</PercentBlock>
        </ThemeWrapper>
    </HoverPaper>
)
