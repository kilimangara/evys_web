import { createAction, createReducer } from 'redux-act'
import produce from 'immer'

import { loadStudents, addStudent } from '../../api'
import { merge, omit } from 'lodash'

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

export const loadStudent = (page = 1, query = '') => dispatch => {
    if (page > totalPages)
        return new Promise(function(resolve, reject) {
            resolve()
        })
    dispatch(startLoadingStudents())
    return loadStudents(page, query).then(response => {
        const { data } = response
        const { count, result } = data
        dispatch(
            successLoadingStudents({
                list: result,
                totalPages: count,
                currentPage: page,
                fetching: false
            })
        )
    })
}

export default createReducer(
    {
        [startLoadingStudents]: state =>
            produce(state, draft => {
                draft.fetching = true
            }),
        [successLoadingStudents]: (state, payload) =>
            produce(state, draft => {
                if (payload.currentPage !== 1) payload.unshift(...state.list)
                merge(draft, payload)
            }),
        [resetStudentsList]: (state, payload) => produce(state, draft => merge(draft, omit(initialState, ['current'])))
    },
    initialState
)
