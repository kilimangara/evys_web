import React from 'react'
import { Drawer, Toolbar, Icon } from '@material-ui/core'
import styled from 'styled-components'
import { theme, studentTheme } from '../../utils/global_theme'
import IconButton from '@material-ui/core/IconButton/IconButton'
export const AppDrawer = styled(Drawer)``

export const AppToolbar = styled(({ height, inverse, ...props }) => <Toolbar {...props} />)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${({ inverse }) => (inverse ? 'white' : `${theme.PRIMARY}`)};
    height: ${({ height }) => height};
`

export const CompanyBlock = styled.div`
    background-color: ${theme.PRIMARY};
    color: white;
    display: flex;
    align-items: center;
`

export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
`

export const ToolbarGroup = styled.div`
    display: flex;
`

export const ListIcon = styled(Icon)`
    overflow: visible;
    width: inherit;
`

export const LeftPanelContainer = styled.div`
    @media screen and (min-width: 0px) and (max-width: 748px) {
        display: none;
    }
    width: 300px;
    min-width: 300px;
    max-width: 300px;
    display: flex;
    flex-direction: column;
`

export const LeftPanelNavigation = styled.div`
    flex-grow: 1;
    flex: 1;
    flex-direction: column;
    align-items: stretch;
    display: flex;
    justify-content: center;
`

export const LeftPanelNavigationItem = styled.div`
    border-color: ${props => (props.active ? studentTheme.ACCENT : 'transparent')};
    cursor: ${props => (props.active ? 'default' : 'pointer')};
    border-width: 0 0 0 5px;
    border-style: solid;
    transition: border-color 0.3s;
    padding-left: 50px;
    color: ${props => (props.active || props.mainColor ? 'white' : studentTheme.PRIMARY_LIGHT)};

    :hover {
        border-color: ${studentTheme.ACCENT};
        color: white;
    }
`

export const StudentAppWrapper = styled.div`
    display: flex;
    width: calc(100% - 100px);
    padding: 50px 0 0 0;
    height: calc(100% - 65px);
    @media screen and (min-width: 0px) and (max-width: 748px) {
        padding: 50px;
    }
`

export const SearchButton = styled(IconButton)`
    padding: 0;
    position: relative;
    right: 30px;
    color: ${studentTheme.TEXT_COLOR};
`
