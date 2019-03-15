import React, { Component } from 'react'
import { CenteredContent, ColoredButton, RowFlexed, WithVerticalMargin } from '../../styled/common'
import { ButtonsBlock, FavoriteSubject, FavoriteSubjectsGrid } from '../../styled/favoriteSubjects'
import { studentTheme } from '../../../utils/global_theme'

export const FavoriteSubjects = ({ subjects, selected, onSelect, onApply }) => (
    <CenteredContent style={{ flex: '0 0 auto' }}>
        <FavoriteSubjectsGrid>
            {subjects.map(subject => (
                <FavoriteSubject
                    key={subject.name}
                    selected={!!selected.find(selectedSubject => selectedSubject.name === subject.name)}
                    onClick={() => onSelect(subject)}
                >
                    {subject.name}
                </FavoriteSubject>
            ))}
        </FavoriteSubjectsGrid>
        <WithVerticalMargin margin={'24px'} style={{ minHeight: 'fit-content' }}>
            <RowFlexed>
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
                    onClick={onApply}
                >
                    применить
                </ColoredButton>
            </RowFlexed>
        </WithVerticalMargin>
    </CenteredContent>
)
