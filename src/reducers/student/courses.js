import { actionTypesFor } from '../../actions/actionTypesFor'

import {
    getStudentCourse,
    getStudentCourses,
    getStudentProfile,
    getStudentTheme,
    getStudentThemes,
    getStudentThemeTheory,
    updateStudentProfile,
    getStudentThemeVideo,
    searchSubjects
} from '../../api'
import createAction from 'redux-act/src/createAction'
import createReducer from 'redux-act/src/createReducer'

const initialState = {
    coursesList: [],
    fetching: false,
    currentCourse: null
}

const coursesLoading = createAction('courses/courses-loading')
const coursesFetchSuccess = createAction('courses/courses-fetch-success')
const currentCourseFetchSuccess = createAction('courses/current-course-fetch-success')
const coursesReset = createAction('courses/courses-reset')
const themesLoading = createAction('courses/themes-loading')
const themesLoadingSuccess = createAction('courses/themes-loading-success')
const videosLoading = createAction('courses/videos-loading')
const videosLoadingSuccess = createAction('courses/videos-loading-success')

export const getCurrentCourses = (page = 1) => dispatch => {
    dispatch(coursesLoading())
    return getStudentCourses({ progressTo: '99', page }).then(({ data }) => {
        page === 1 ? dispatch(coursesReset(data.results)) : dispatch(coursesFetchSuccess(data.results))
    })
}

export const getFinishedCourses = (page = 1) => dispatch => {
    dispatch(coursesLoading())
    return getStudentCourses({ progressFrom: '100', page }).then(({ data }) => {
        page === 1 ? dispatch(coursesReset(data.results)) : dispatch(coursesFetchSuccess(data.results))
    })
}

export const getCourseById = id => dispatch => {
    dispatch(coursesLoading())
    return getStudentCourse(id).then(response => dispatch(currentCourseFetchSuccess(response.data)))
}

export const loadThemes = (courseId, parentThemeId) => dispatch => {
    dispatch(themesLoading())
    return getStudentThemes(courseId, parentThemeId, { parentTheme: parentThemeId }).then(response => {
        dispatch(themesLoadingSuccess())
        return response.data
    })
}

export const loadThemeById = themeId => dispatch => {
    dispatch(themesLoading())
    return getStudentTheme(themeId).then(response => {
        dispatch(themesLoadingSuccess())
        return response.data
    })
}

export const loadTheoryByThemeId = themeId => dispatch => {
    dispatch(themesLoading())
    return getStudentThemeTheory(themeId).then(response => {
        dispatch(themesLoadingSuccess())
        return response.data
    })
}

export const loadThemeVideos = themeId => dispatch => {
    dispatch(videosLoading())
    return getStudentThemeVideo(themeId).then(response => {
        dispatch(videosLoadingSuccess())
        return response.data
    })
}

export default createReducer(
    {
        [coursesLoading]: state => ({ ...state, fetching: true }),
        [coursesReset]: (state, payload) => ({ ...state, fetching: false, coursesList: payload }),
        [coursesFetchSuccess]: (state, payload) => ({
            ...state,
            fetching: false,
            coursesList: { ...state.coursesList, ...payload }
        }),
        [themesLoading]: state => ({ ...state, fetching: true }),
        [videosLoading]: state => ({ ...state, fetching: true }),
        [themesLoadingSuccess]: state => ({ ...state, fetching: false }),
        [videosLoadingSuccess]: state => ({ ...state, fetching: false }),
        [currentCourseFetchSuccess]: (state, payload) => ({ ...state, currentCourse: payload })
    },
    initialState
)
