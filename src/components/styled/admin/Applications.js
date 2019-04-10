import React from 'react'
import styled from 'styled-components'
import { ColumnFlexed } from '../common'
import transition from 'styled-transition-group'
import { Paper } from '../common'
import Fab from '@material-ui/core/Fab'
import { theme } from '../../../utils/global_theme'

export const ApplicationsList = styled.div`
    display: flex;
    flex-wrap: wrap;

    @media screen and (min-width: 0px) and (max-width: ${65 + 2 * 378}px) {
        max-width: ${378}px;
    }

    @media screen and (min-width: ${65 + 378 * 2 + 1}px) and (max-width: ${65 + 3 * 378}px) {
        max-width: ${378 * 2}px;
    }

    @media screen and (min-width: ${65 + 378 * 3 + 1}px) {
        max-width: ${378 * 3}px;
    }
`

export const ApplicationCardImage = styled.img`
    max-width: 100%;
    max-height: 100%;
`

export const ApplicationCardImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-self: center;
    width: 60%;
    height: 80px;
    margin-top: 20px;
`

export const ApplicationName = styled.div`
    margin: 20px 0;
    display: flex;
    align-self: center;

    > * {
        font-weight: 600;
    }
`

export const ApplicationDescription = styled(ColumnFlexed)``

export const ApplicationCardWrapper = styled(Paper)`
    display: flex;
    min-height: 300px;
    flex-direction: column;
    padding: 15px;
    margin: 24px;
    position: relative;
    background: ${theme.CONTRAST_LIGHT};
`

export const HoverFade = transition.div`
 &:enter {
        opacity: 0.01;
    }
    &:enter-active {
        opacity: 1;
        transition: opacity 200ms ease-in;
    }
    &:exit {
        opacity: 1;
    }
    &:exit-active {
        opacity: 0.01;
        transition: opacity 200ms ease-out;
    }
`

export const ApplicationCardHoverBlock = styled.div`
    position: absolute;
    width: 100%;
    height: 60%;
    top: 40%;
    left: 0;
`

export const HoverGradient = styled.div`
    width: 100%;
    height: 20px;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(255, 255, 255, 1));
`

export const HoverFill = styled.div`
    background: white;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const AddAppFab = styled(Fab)`
    position: fixed;
    bottom: 16px;
    right: 16px;
`
