import { Component } from 'react'
import React from 'react'
import {
    FieldsTitle,
    ThemeContentSplit,
    ThemeName,
    ThemesTitle,
    ThemesTreeWrapper,
    ThemeTest,
    ThemeTheory,
    ThemeTreeBranch,
    ThemeVideo
} from '../styled/courses'
import { ColoredIcon, H2, H3, RowFlexed } from '../styled/common'
import { declOfNum } from '../../utils/utilFunctions'
import { studentTheme } from '../../utils/global_theme'
import CheckIcon from '@material-ui/core/SvgIcon/SvgIcon'

export class CourseThemesTree extends Component {
    makeTreeFromThemes = themes => {
        if (!themes) return
        const parentMap = {}
        themes.forEach(theme => {
            parentMap[theme.parentThemeId] =
                parentMap[theme.parentThemeId] && parentMap[theme.parentThemeId].length
                    ? [...parentMap[theme.parentThemeId], theme]
                    : [theme]
        })
        return parentMap
    }

    renderTheme = (theme, themesTree) => {
        if (!themesTree) return
        const subThemes = themesTree[theme.id]
        const { name, type, testsCount, hasTheory, mediaCount } = theme
        return (
            <ThemeTreeBranch>
                <RowFlexed>
                    <ThemeContentSplit>
                        <div>
                            <H3>{type === 'Theme' ? 'Тема' : type === 'Section' ? 'Раздел' : ''}</H3>
                            <ThemeName>{theme.name}</ThemeName>
                        </div>
                        <div>
                            <ThemeTheory>
                                {hasTheory && (
                                    <ColoredIcon color={studentTheme.TEXT_COLOR}>
                                        <CheckIcon />
                                    </ColoredIcon>
                                )}
                            </ThemeTheory>
                            <ThemeVideo>
                                {mediaCount > 0 && (
                                    <ColoredIcon color={studentTheme.TEXT_COLOR}>
                                        <CheckIcon />
                                    </ColoredIcon>
                                )}
                            </ThemeVideo>
                            <ThemeTest>
                                {testsCount > 0 && (
                                    <ColoredIcon color={studentTheme.TEXT_COLOR}>
                                        <CheckIcon />
                                    </ColoredIcon>
                                )}
                            </ThemeTest>
                        </div>
                    </ThemeContentSplit>
                </RowFlexed>
                {subThemes && subThemes.map(subTheme => this.renderTheme(subTheme, themesTree))}
            </ThemeTreeBranch>
        )
    }

    render() {
        const { themes } = this.props
        const themesTree = this.makeTreeFromThemes(themes)
        return (
            <ThemesTreeWrapper>
                <FieldsTitle>
                    <H3>Название темы</H3>
                    <div>
                        <ThemeTheory>Теоретические материалы</ThemeTheory>
                        <ThemeVideo>Видеоматериалы</ThemeVideo>
                        <ThemeTest>Тесты</ThemeTest>
                    </div>
                </FieldsTitle>
                {themesTree['null'] && themesTree['null'].map(theme => this.renderTheme(theme, themesTree))}
            </ThemesTreeWrapper>
        )
    }
}
