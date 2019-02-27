import styled from 'styled-components'
import React from 'react'
import { studentTheme } from '../../utils/global_theme'

export const FavoriteSubject = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 24px;
  display: flex;
  text-align: center;
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
    min-height: fit-content;
    margin-top: 100px;
    @media screen and (min-width: 0px) and (max-width: 496px) {
        max-width: 248px;
    }

    @media screen and (min-width: 497px) and (max-width: 744px) {
        max-width: 496px;
    }

    @media screen and (min-width: 745px) and (max-width: 992px) {
        max-width: 744px;
    }

    @media screen and (min-width: 993px) {
        max-width: 992px;
    }
`
