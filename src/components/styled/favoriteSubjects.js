import styled from 'styled-components'
import React from 'react'
import { studentTheme } from '../../utils/global_theme'

export const FavoriteSubject = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${studentTheme.FONT};
  font-size: ${studentTheme.H3};
  color: ${studentTheme.TEXT_COLOR}
  background:${({ selected }) =>
      selected
          ? `linear-gradient(to bottom right, ${studentTheme.ACCENT}, #02AB91)`
          : `linear-gradient(to bottom right, #515151, #434343)`};
`

export const FavoriteSubjectsGrid = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    @media screen and (min-width: 0px) and (max-width: 448px) {
        max-width: 224px;
    }

    @media screen and (min-width: 449px) and (max-width: 672px) {
        max-width: 448px;
    }

    @media screen and (min-width: 673px) and (max-width: 896px) {
        max-width: 672px;
    }

    @media screen and (min-width: 897px) and (max-width: 1120px) {
        max-width: 896px;
    }

    @media screen and (min-width: 1121px) {
        max-width: 1120px;
    }
`

export const ButtonsBlock = styled.div`
    display: flex;
    flex-direction: row;
`
