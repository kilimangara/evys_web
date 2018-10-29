import React from 'react'
import { Drawer, Toolbar, Icon } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import styled from 'styled-components'
import { theme, studentTheme } from '../../utils/global_theme'

export const AppDrawer = styled(Drawer)`
    width: 200px;
    z-index: 2;
`

export const AppToolbar = styled(({ height, ...props }) => <Toolbar {...props} />)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${theme.PRIMARY};
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
    margin-left: ${({ isDesktop }) => (isDesktop ? '256px' : '0px')};
    width: ${({ isDesktop }) => (isDesktop ? 'calc(100% - 256px)' : '100%')};
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
  width: 300px;
  display: flex;
  flex-direction: column;
`

export const LeftPanelNavigation = styled.div`
  flex-grow: 1;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  display: flex;
`

export const LeftPanelNavigationItem = styled.div`
  border-color: ${props => props.active ? studentTheme.ACCENT : 'transparent'};
  cursor: ${props => props.active ? 'default' : 'pointer'}
  border-width: 0 0 0 5px;
  border-style: solid;
  transition: border-color .3s;
  padding-left: 50px;
  color: ${props => props.active || props.mainColor ? 'white' : studentTheme.PRIMARY_LIGHT};

  :hover {
    border-color: ${studentTheme.ACCENT};
    color: white;
  }
`
