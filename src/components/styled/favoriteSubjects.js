import styled from 'styled-components'
import React from 'react'
import { studentTheme } from '../../utils/global_theme'

export const FavoriteSubject = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  word-break: break-word;
  padding: 10px;
  margin: 12px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-family: ${studentTheme.FONT};
  font-size: ${studentTheme.H4};
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
    @media screen and (min-width: 0px) and (max-width: ${144 * 3}px) {
        max-width: ${144 * 2}px;
    }

    @media screen and (min-width: ${144 * 3 + 1}px) and (max-width: ${144 * 4}px) {
        max-width: ${144 * 3}px;
    }

    @media screen and (min-width: ${144 * 4 + 1}px) {
        max-width: ${144 * 4}px;
    }
`
