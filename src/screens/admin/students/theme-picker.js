import React from 'react'
import { ColumnFlexed, H4, RowFlexed } from '../../../components/styled/common'

import SearchIcon from '@material-ui/icons/Search'
import {
    SubjectPickerList,
    SubjectPickerListItem,
    SubjectPickerWrapper
} from '../../../components/styled/admin/Subjects'
import { SearchCard, SearchIconButton, SearchInput } from '../../../components/styled/admin/Students'

const ThemePicker = ({ list = [], onSearch, query, onSearchChange, onPicked }) => (
    <SubjectPickerWrapper>
        <SearchCard style={{ width: '100%' }} disableShadow>
            <SearchInput placeholder="Поиск тем" value={query} onChange={onSearchChange} />
            <SearchIconButton aria-label="Искать" onClick={onSearch}>
                <SearchIcon />
            </SearchIconButton>
        </SearchCard>
        <SubjectPickerList>
            {list.map(item => (
                <SubjectPickerListItem key={item.id} button onClick={() => onPicked(item)}>
                    <H4 color={'#333'}>{item.name}</H4>
                </SubjectPickerListItem>
            ))}
        </SubjectPickerList>
    </SubjectPickerWrapper>
)

export default ThemePicker
