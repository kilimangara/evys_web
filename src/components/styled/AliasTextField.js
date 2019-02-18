import React from 'react'
import styled from 'styled-components'
import { studentTheme } from '../../utils/global_theme'

export const AliasTextfieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 10px 0;
`

export const FieldAlias = styled.div`
    padding-left: 10px;
    color: ${({ color }) => color || studentTheme.TEXT_COLOR};
    font: ${studentTheme.FONT};
    font-size: ${({ fontSize }) => fontSize || studentTheme.H3};
`

export const InputField = styled.input`
    background-color: ${({ backgroundColor }) => backgroundColor || studentTheme.INPUT_COLOR};
    color: ${({ color }) => color || studentTheme.TEXT_COLOR};
    padding-left: 10px;
    height: 40px;
    width: 100%;
    border: 0;
    border-radius: 2px;
    :focus {
        outline: none;
    }
`
