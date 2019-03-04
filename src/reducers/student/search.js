import { getPopularSubjects, searchSubjects, sendAuthorizeCode, sendCode } from '../../api'
import createAction from 'redux-act/src/createAction'
import createReducer from 'redux-act/src/createReducer'

const initialState = {
    subjectsList: [],
    searchResults: [],
    searchValue: '',
    fetching: false
}

const searchSubjectsLoading = createAction('search/search-subjects-loading')
const searchSubjectsLoaded = createAction('search/search-subjects-loaded')
const allSubjectsLoading = createAction('search/all-subjects-loading')
const allSubjectsLoaded = createAction('search/all-subjects-loaded')
const setSearchValue = createAction('search/set-search-value')

export const getSearchSubjects = searchText => dispatch => {
    dispatch(searchSubjectsLoading())
    return searchSubjects({ search: searchText }).then(response => {
        dispatch(setSearchValue(searchText))
        dispatch(searchSubjectsLoaded(response.data))
    })
}

export const setSearch = text => dispatch => dispatch(setSearchValue(text))

export const getAllSubjects = () => dispatch => {
    dispatch(allSubjectsLoading())
    return getPopularSubjects().then(response => {
        dispatch(allSubjectsLoaded(response.data))
    })
}

export default createReducer(
    {
        [searchSubjectsLoading]: state => ({ ...state, fetching: true }),
        [searchSubjectsLoaded]: (state, payload) => ({ ...state, fetching: false, searchResults: payload }),
        [allSubjectsLoading]: state => ({ ...state, fetching: true }),
        [allSubjectsLoaded]: (state, payload) => ({ ...state, fetching: false, subjectsList: payload }),
        [setSearchValue]: (state, value) => ({ ...state, searchValue: value })
    },
    initialState
)
