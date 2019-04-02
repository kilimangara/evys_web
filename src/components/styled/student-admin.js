import React from 'react'
import styled from 'styled-components'
import Toolbar from '@material-ui/core/Toolbar'

export const TableToolbar = styled(({ highlight, ...props }) => <Toolbar {...props} />)`
    color: ${({ highlight }) => (highlight ? theme.ACCENT_COLOR : 'black')};
    background-color: ${({ highlight }) => (highlight ? theme.ACCENT_COLOR_A(0.5) : 'white')};
`

export const ToolbarTitle = styled.div`
    flex: 1 0 auto;
`
