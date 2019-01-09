import { actionTypesFor } from '../../actions/actionTypesFor'

import {
    getStudentCourse,
    getStudentCourses,
    getStudentProfile,
    getStudentThemes,
    updateStudentProfile
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
const coursesReset = createAction('courses/courses-reset')
const themesLoading = createAction('courses/themes-loading')
const themesLoadingSuccess = createAction('courses/themes-loading-success')

export const getCurrentCourses = (page = 1) => dispatch => {
    dispatch(coursesLoading)
    return getStudentCourses({ progressTo: '99', page }).then(response => {
        page === 1 ? dispatch(coursesReset(response.data)) : dispatch(coursesFetchSuccess(response.data))
    })
}

export const getFinishedCourses = (page = 1) => dispatch => {
    dispatch(coursesLoading)
    return getStudentCourses({ progressFrom: '100', page }).then(response => {
        page === 1 ? dispatch(coursesReset(response.data)) : dispatch(coursesFetchSuccess(response.data))
    })
}

export const getCourseById = id => dispatch => {
    dispatch(coursesLoading)
    return getStudentCourse(id).then(response => dispatch(coursesFetchSuccess(response.data)))
}

export const loadThemes = (courseId, parentThemeId) => dispatch => {
    dispatch(themesLoading)
    return getStudentThemes(courseId, parentThemeId, { parentTheme: parentThemeId }).then(response => response.data)
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
        [themesLoadingSuccess]: state => ({ ...state, fetching: false })
    },
    initialState
)
