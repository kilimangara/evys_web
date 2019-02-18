import { createAction, createReducer } from 'redux-act'
import produce from 'immer'

import { getSubjects, getSubject, createSubject, fetchCategories, putSubject, deleteSubject } from '../../api'
import { merge } from 'lodash'
import {chooseAccount} from './account'

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
export const endLoadingSubjects = createAction('subjects/end-loading')

export const loadSubjects = (page = 1, query = '') => dispatch => {
    dispatch(startLoadingSubjects())
    return getSubjects(page, query).then(response => {
        const { data } = response
        const { count, results } = data
        return dispatch(
            successLoadingSubjects({
                list: results,
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
        return response
    })
}

export const newSubject = (data) => dispatch => {
    return createSubject(data)
}

export const fetchSubjectCategories = () => dispatch => {
    return fetchCategories()
}

export const updateSubject = (subjectId, data) => dispatch => {
  dispatch(startLoadingSubjects())
  return putSubject(subjectId, data).then((response) =>{
    const { data } = response
    dispatch(successShowSubject(data))
    dispatch(replaceSubject(data))
    return response
  }).catch((err)=>{
    dispatch(endLoadingSubjects())
    throw err
  })
}

export const removeSubject = (subjectId) => dispatch => deleteSubject(subjectId)

export default createReducer(
    {
        [endLoadingSubjects]: state =>
          produce(state, draft => {
              draft.fetching = false
          }),
        [startLoadingSubjects]: state =>
            produce(state, draft => {
                draft.fetching = true
            }),
        [successLoadingSubjects]: (state, payload) =>
            produce(state, draft => {
                if (payload.currentPage !== 1) payload.unshift(...state.list)
                merge(draft, payload)
            }),
        [resetSubjectList]:(state, payload) => produce(state, draft => {
              draft.list = []
              draft.totalPages = 1
              draft.currentPage = 0
              draft.fetching = false
            }),
        [successShowSubject]: (state, payload) =>
            produce(state, draft => {
                draft.current = payload
                draft.fetching = false
            }),
        [replaceSubject]: (state, payload) =>
            produce(state, draft => {
                let subject = draft.list.find(el => el.id === payload.id)
                if (Boolean(subject)) merge(subject, payload)
            }),
        [chooseAccount]: () => initialState
    },
    initialState
)