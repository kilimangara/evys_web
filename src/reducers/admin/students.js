import { createAction, createReducer } from 'redux-act'
import produce from 'immer'

import { loadStudents, addStudent, subscribeStudents } from '../../api'
import { merge, omit } from 'lodash'

import { chooseAccount } from './account'

const initialState = {
    list: [],
    totalPages: 1,
    currentPage: 0,
    fetching: false,
    current: null
}

export const startLoadingStudents = createAction('students/start-loading')
export const successLoadingStudents = createAction('students/success-loading')
export const successShowStudent = createAction('students/success-show')
export const resetStudentsList = createAction('students/reset-list')

export const getStudents = (page = 1, query = '') => dispatch => {
    dispatch(startLoadingStudents())
    return loadStudents(page, query).then(response => {
        const { data } = response
        const { count, results } = data
        return dispatch(
            successLoadingStudents({
                list: results,
                totalPages: count,
                currentPage: page,
                fetching: false
            })
        )
    })
}

export const newStudent = data => dispatch => {
    return addStudent(data)
}

export const addStudentsToTariff = (tariffId, studentIds) => dispatch => {
    return subscribeStudents(tariffId, studentIds)
}

export default createReducer(
    {
        [startLoadingStudents]: state =>
            produce(state, draft => {
                draft.fetching = true
            }),
        [successLoadingStudents]: (state, payload) =>
            produce(state, draft => {
                draft.list = payload.list
                draft.totalPages = payload.totalPages
                draft.currentPage = payload.currentPage
                draft.fetching = false
            }),
        [resetStudentsList]: (state, payload) => produce(state, draft => merge(draft, omit(initialState, ['current']))),
        [chooseAccount]: state => initialState
    },
    initialState
)
