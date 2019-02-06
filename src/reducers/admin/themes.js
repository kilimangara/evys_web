import { createAction, createReducer } from 'redux-act'
import produce from 'immer'
import { merge } from 'lodash'
import {
  getSubjectThemes,
  createSubjectTheme,
  updateTheme,
  getThemeTheory,
  createThemeTheory,
  getTheoryVideos,
  createTheoryVideo,
  getTheme,
  deleteTheme
} from '../../api'


export const loadTheory = (themeId) => (dispatch) => {
  return getThemeTheory(themeId).then(response => {
    const {data} = response
    const theoryId = data.id
    if(!theoryId) return {
      theory: data,
      videos: []
    }
    return getTheoryVideos(theoryId).then((videosResponse) =>{
      const videos = videosResponse.data
      return {
        theory: data,
        videos
      }
    })
  })
}

export const addTheoryVideo = (theoryId, data) => (dispatch) => {
  return createTheoryVideo(theoryId, data)
}

const initialState = {
    list: [],
    totalPages: 1,
    currentPage: 0,
    fetching: false,
    current: null
}

export const startLoadingThemes = createAction('themes/start-loading')
export const successLoadingThemes = createAction('themes/success-loading')
export const successShowThemes = createAction('themes/success-show')
export const successCreateTheme = createAction('themes/success-create')
export const replaceTheme = createAction('themes/replace')
export const resetThemesList = createAction('themes/reset-list')
export const endLoadingThemes = createAction('themes/end-loading')

export const loadThemes = (subjectId, params={}) => dispatch => {
    dispatch(startLoadingThemes())
    return getSubjectThemes(subjectId, params).then(response => {
        const { page=1 } = params
        const { data } = response
        const { count, results } = data
        return dispatch(
            successLoadingThemes({
                list: results,
                totalPages: count,
                currentPage: page,
                fetching: false
            })
        )
    })
}

export const loadTheme = themeId => dispatch => {
    dispatch(startLoadingThemes())
    return getTheme(themeId).then(response => {
        const { data } = response
        dispatch(successShowThemes(data))
        dispatch(replaceTheme(data))
        return response
    })
}

export const createTheme = (subjectId, data) => (dispatch) => {
  return createSubjectTheme(subjectId, data)
}

export const changeTheme = (themeId, data) => (dispatch) => {
  dispatch(startLoadingThemes())
  return updateTheme(themeId, data).then((response) => {
    const { data } = response
    dispatch(successShowThemes(data))
    dispatch(replaceTheme(data))
    return response
  }).catch((err) => {
    dispatch(endLoadingThemes())
    throw err
  })
}

export const removeTheme = (themeId) => dispatch => deleteTheme(themeId)

export default createReducer(
    {
        [endLoadingThemes]: state =>
          produce(state, draft => {
              draft.fetching = false
          }),
        [startLoadingThemes]: state =>
            produce(state, draft => {
                draft.fetching = true
            }),
        [successLoadingThemes]: (state, payload) =>
            produce(state, draft => {
                if (payload.currentPage !== 1) payload.unshift(...state.list)
                merge(draft, payload)
            }),
        [resetThemesList]: (state, payload) => produce(state, draft => merge(draft, omit(initialState, ['current']))),
        [successShowThemes]: (state, payload) =>
            produce(state, draft => {
                draft.current = payload
                draft.fetching = false
            }),
        [replaceTheme]: (state, payload) =>
            produce(state, draft => {
                let subject = draft.list.find(el => el.id === payload.id)
                if (Boolean(subject)) merge(subject, payload)
            })
    },
    initialState
)
