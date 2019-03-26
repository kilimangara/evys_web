import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import { theme } from '../../../utils/global_theme'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'

export const Card = styled.div`
    margin-top: ${({ marginTop = 0 }) => `${marginTop}px`};
    border: 1px solid rgba(0, 0, 0, 0.12);
    background-color: white;
    box-shadow: 0 0 1px #bdbfc1, 0 1px #ced2d3;
    padding: ${({ noPadding }) => (noPadding ? '0px' : '12px')};
`

export const SearchCard = styled.div`
    margin-top: ${({ marginTop = 0 }) => `${marginTop}px`};
    background-color: white;
    padding: 4px;
    display: flex;
    align-items: center;
`

export const Container = styled.div`
    display: flex;
    padding: 24px 12px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
`

export const SearchIconButton = styled(IconButton)`
    padding: 10px;
`

export const SearchInput = styled(InputBase)`
    margin-left: 24px;
    flex: 1;
`

export const Spacer = styled.div`
    flex: 1 1 100%;
`

export const ToolbarTitle = styled.div`
    flex: 0 0 auto;
`

export const TableToolbar = styled(({ highlight, ...props }) => <Toolbar {...props} />)`
    color: ${({ highlight }) => (highlight ? theme.ACCENT_COLOR : 'black')};
    background-color: ${({ highlight }) => (highlight ? theme.ACCENT_COLOR_A(0.5) : 'white')};
`

export const NoStudentsWrapper = styled.div`
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

export const NoStudentsText = styled(Typography)`
    font-weight: 300;
    font-size: 22px;
    text-align: center;
    color: black;
`

export const ToolbarContent = styled.div`
    flex: 1 0 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
`

export const ExportContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
