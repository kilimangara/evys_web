import React from 'react'
import { RowFlexed, RowForm, StudentInput } from '../styled/common'
import SearchIcon from '@material-ui/icons/Search'
import { SearchButton } from '../styled/layout'

export const SearchBar = ({ onChange, value, onSubmit }) => (
    <RowForm onSubmit={onSubmit}>
        <StudentInput onChange={onChange} type={'input'} value={value} placeholder="поиск" />
        <SearchButton type={'submit'}>
            <SearchIcon />
        </SearchButton>
    </RowForm>
)
