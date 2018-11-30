import React, { Component } from 'react'
import { CenteredContent, ColoredButton } from '../../styled/common'
import { ButtonsBlock, FavoriteSubject, FavoriteSubjectsGrid } from '../../styled/favoriteSubjects'
import { studentTheme } from '../../../utils/global_theme'

export const FavoriteSubjects = ({ subjects, selected }) => (
    <CenteredContent>
        <FavoriteSubjectsGrid>
            {subjects.map(subject => (
                <FavoriteSubject selected={selected.includes(subject.name)} key={subject.alias}>{subject.name}</FavoriteSubject>
            ))}
        </FavoriteSubjectsGrid>
        <ButtonsBlock>
            <ColoredButton
                color={studentTheme.BACKGROUND}
                textColor={studentTheme.PRIMARY_LIGHT}
                style={{ padding: '0 12px' }}
            >
                сбросить
            </ColoredButton>
            <ColoredButton
                color={studentTheme.BACKGROUND}
                textColor={studentTheme.ACCENT}
                textHover={studentTheme.BACKGROUND}
                style={{ padding: '0 12px' }}
            >
                применить
            </ColoredButton>
        </ButtonsBlock>
    </CenteredContent>
)
