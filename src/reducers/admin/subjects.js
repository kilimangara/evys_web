import { createAction, createReducer } from 'redux-act'
import produce from 'immer'

import { getSubjects, getSubject, createSubject, fetchCategories } from '../../api'
import { merge } from 'lodash'

const initialState = {
    list: [],
    totalPages: 1,
    currentPage: 0,
    fetching: false,
    current: null
}

export const startLoadingSubjects = createAction('subjects/start-loading')
export const successLoadingSubjects = createAction('subjects/success-loading')
export const successShowSubject = createAction('subjects/success-show')
export const successCreateSubject = createAction('subjects/success-create')
export const replaceSubject = createAction('subjects/replace')
export const resetSubjectList = createAction('subjects/reset-list')

export const loadSubjects = (page = 1, query = '') => dispatch => {
    if (page > totalPages)
        return new Promise(function(resolve, reject) {
            resolve()
        })
    dispatch(startLoadingSubjects())
    return loadStudents(page, query).then(response => {
        const { data } = response
        const { count, result } = data
        dispatch(
            successLoadingSubjects({
                list: result,
                totalPages: count,
                currentPage: page,
                fetching: false
            })
        )
    })
}

export const loadSubject = subjectId => dispatch => {
    dispatch(startLoadingSubjects())
    return getSubject(subjectId).then(response => {
        const { data } = response
        dispatch(successShowSubject(data))
        dispatch(replaceSubject(data))
    })
}

export const createSubject = (subject, categorySecret) => dispatch => {
    return createSubject({ subject, categorySecret })
}

export const fetchSubjectCategories = () => dispatch => {
    return fetchCategories()
}

export default createReducer(
    {
        [startLoadingSubjects]: state =>
            produce(state, draft => {
                draft.fetching = true
            }),
        [successLoadingSubjects]: (state, payload) =>
            produce(state, draft => {
                if (payload.currentPage !== 1) payload.unshift(...state.list)
                merge(draft, payload)
            }),
        [resetSubjectList]: (state, payload) => produce(state, draft => merge(draft, omit(initialState, ['current']))),
        [successShowSubject]: (state, payload) =>
            produce(state, draft => {
                draft.current = payload
            }),
        [replaceSubject]: (state, payload) =>
            produce(state, draft => {
                let subject = draft.list.find(el => el.id === payload.id)
                if (Boolean(subject)) merge(subject, payload)
            })
    },
    initialState
)
