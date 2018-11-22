import React from 'react'
import styled from 'styled-components'
import { studentTheme } from '../../utils/global_theme'

export const ImageLoaderContainer = styled.div`
    padding-top: ${({ paddingTop }) => paddingTop || '0'};
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    background-color: ${studentTheme.INPUT_COLOR};
    position: relative;
    display: flex;
    flex: 1;
`

export const ImageCoverContainer = styled.div`
    width: 100%;
    height: 100%;
    max-height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${({hovered}) => hovered ? '1' : '0'};
    transition: opacity .2s ease-in-out;
`
