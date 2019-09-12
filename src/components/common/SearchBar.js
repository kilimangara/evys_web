import React from 'react'
import { RowFlexed, RowForm, StudentInput } from '../styled/common'
import Icon from '@material-ui/core/Icon'
import { SearchButton } from '../styled/layout'

export const SearchBar = ({ onChange, value, onSubmit }) => (
    <RowForm onSubmit={onSubmit}>
        <StudentInput onChange={onChange} type={'input'} value={value} placeholder="поиск" />
        <SearchButton type={'submit'}>
            <Icon>search</Icon>
        </SearchButton>
    </RowForm>
)
