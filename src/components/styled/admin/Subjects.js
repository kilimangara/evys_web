import React from 'react'
import styled from 'styled-components'
import { ColumnFlexed } from '../common'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

export const SubjectPickerWrapper = styled(ColumnFlexed)`
    width: 350px;
    height: 400px;
    padding: 16px;
    align-items: center;
`
export const SubjectPickerList = styled(List)`
    width: 100%;
`

export const SubjectPickerListItem = styled(ListItem)`
    //border-bottom: 1px solid #ccc;
`
