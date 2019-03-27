import React from 'react'
import { ColumnFlexed, H4, RowFlexed } from '../../../components/styled/common'

import SearchIcon from '@material-ui/icons/Search'
import {
    SubjectPickerList,
    SubjectPickerListItem,
    SubjectPickerWrapper
} from '../../../components/styled/admin/Subjects'
import { SearchCard, SearchIconButton, SearchInput } from '../../../components/styled/admin/Students'

export const SubjectPicker = ({ subjects, onSubjectSearch, searchValue, onSearchChange, onSubjectSave }) => (
    <SubjectPickerWrapper>
        <SearchCard style={{ width: '100%' }} disableShadow>
            <SearchInput placeholder="Поиск учеников" value={searchValue} onChange={onSearchChange} />
            <SearchIconButton aria-label="Искать" onClick={onSubjectSearch}>
                <SearchIcon />
            </SearchIconButton>
        </SearchCard>
        <SubjectPickerList>
            {subjects &&
                subjects.map(subject => (
                    <SubjectPickerListItem key={subject.id} button onClick={() => onSubjectSave(subject)}>
                        <H4 color={'#333'}>{subject.subject}</H4>
                    </SubjectPickerListItem>
                ))}
        </SubjectPickerList>
    </SubjectPickerWrapper>
)
