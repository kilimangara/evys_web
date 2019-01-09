// import trivialRedux from 'trivial-redux'
//
// import auth from './endpoints/auth'
// import account from './endpoints/account'
// import tariffs from './endpoints/tariffs'
// import courses from './endpoints/courses'
// import stats from './endpoints/stats'
// import account_admin from './endpoints/admin/account_admin'
// import auth_admin from './endpoints/admin/auth_admin'
// import subjects_admin from './endpoints/admin/subjects_admin'
// import test_cases_admin from './endpoints/admin/test_cases_admin'
// import themes_admin from './endpoints/admin/themes_admin'
// import students_admin from './endpoints/admin/students_admin'
// import tariffs_admin from './endpoints/admin/tariffs_admin'
// import company_admin from './endpoints/admin/company_admin'
//
// export const adminAPI = trivialRedux({
//     auth_admin,
//     account_admin,
//     subjects_admin,
//     test_cases_admin,
//     themes_admin,
//     students_admin,
//     tariffs_admin,
//     company_admin
// })
//
// export const studentAPI = trivialRedux({
//     auth,
//     account,
//     tariffs,
//     courses,
//     stats
// })
import axios from 'axios'
import humps from 'humps'
import { store } from './store'

const baseURL = __DEV__ ? 'http://localhost:8000/api/' : 'https://evys.ru/api/'

const axiosInstance = axios.create({
    baseURL,
    transformResponse: [...axios.defaults.transformResponse, data => humps.camelizeKeys(data)],
    transformRequest: [data => humps.decamelizeKeys(data), ...axios.defaults.transformRequest]
})

function basicAdminAuth(config) {}

function studentTokenAuth(config) {}

axiosInstance.interceptors.request.use(config => {
    // здесь логика пропихивания авторизационных данных
})

// student methods

// student authorization

export function sendCode(phone) {
    return axiosInstance.request({
        url: '/student/code',
        method: 'POST',
        data: { phone }
    })
}

export function sendAuthorizeCode(code) {
    return axiosInstance.request({
        url: '/student/auth',
        method: 'POST',
        data: { code }
    })
}

export function getStudentProfile() {
    return axiosInstance.request({
        url: '/student/info'
    })
}

export function updateStudentProfile(profile) {
    return axiosInstance.request({
        url: '/student/info',
        method: 'PUT',
        data: profile
    })
}

export function getStudentCourses(params) {
    return axiosInstance.request({
        url: '/student/courses',
        params
    })
}

export function getStudentCourse(courseId) {
    return axiosInstance.request({
        url: `/student/course/${courseId}`
    })
}

export function getStudentThemes(courseId, themeId, params) {
    return axiosInstance.request({
        url: `/student/course/${params.themeId}/themes`,
        meta: {
            fetch: {
                url: `~student/course/${params.course_id}/themes`,
                params
            },
            with_parent_theme: Boolean(themeId),
            is_course: true
        }
    })
}

export function getStudentTheme(themeId) {
    return axiosInstance.request({
        url: `/student/theme/${themeId}`
    })
}

export function getStudentThemeTheory(themeId) {
    return axiosInstance.request({
        url: `/student/theme/${themeId}/theory`
    })
}

export function getStudentThemeVideo(themeId) {
    return axiosInstance.request({
        url: `/student/theme/${themeId}/theory_video`
    })
}

// admin methods

function getAccounts() {
    return axiosInstance.request({
        url: '/admin2/accounts'
    })
}

function createAccount(name) {
    return axiosInstance.request({
        url: '/admin2/accounts',
        method: 'POST',
        data: { name }
    })
}

function accountInfo() {
    return axiosInstance.request({
        url: '/admin2/info'
    })
}

function getSubjects(page = 1, query = '') {
    return axiosInstance.request({
        url: '/admin2/subjects',
        params: { page, query }
    })
}

function getSubject(subjectId) {
    return axiosInstance.request({
        url: `/admin2/subject/${subjectId}`
    })
}

function createSubject(title, categorySecret) {
    return axiosInstance.request({
        url: '/admin2/subjects',
        method: 'POST',
        data: {
            subject: title,
            categorySecret
        }
    })
}

function updateSubject(subjectId, data) {
    return axiosInstance.request({
        url: `/admin2/subject/${subjectId}`,
        method: 'PUT',
        data
    })
}

function deleteSubject(subjectId) {
    return axiosInstance.request({
        url: `/admin2/subject/${subjectId}`,
        method: 'DELETE'
    })
}

function fetchCategories() {
    return axiosInstance.request({
        url: `/category`
    })
}

function getSubjectThemes(subjectId, page = 1, parentTheme = undefined) {
    return axiosInstance.request({
        url: `/admin2/subject/${subjectId}/themes`,
        params: { page, parentTheme }
    })
}

function createSubjectTheme(subjectId, data) {
    return axiosInstance.request({
        url: `/admin2/subject/${subjectId}/themes`,
        data,
        method: 'POST'
    })
}

function updateTheme(themeId, data) {
    return axiosInstance.request({
        url: `/admin2/theme/${theme_id}`,
        method: 'PUT',
        data
    })
}

function deleteTheme(themeId) {
    return axiosInstance.request({
        url: `/admin2/theme/${theme_id}`,
        method: 'DELETE'
    })
}

function getThemeTheory(themeId) {
    return axiosInstance.request({
        url: `/admin2/theme/${theme_id}/theory`
    })
}

function createThemeTheory(themeId, data) {
    return axiosInstance.request({
        url: `/admin2/theme/${theme_id}/theory`,
        method: 'POST',
        data
    })
}

function getTheoryVideos(theoryId) {
    return axiosInstance.request({
        url: `/admin2/storage/video/${theoryId}`
    })
}

function createTheoryVideo(theoryId, data) {
    return axiosInstance.request({
        url: `/admin2/storage/video/${theoryId}`,
        method: 'POST',
        data
    })
}

export function getAssets(page = 1, filtersObject = {}) {
    return axiosInstance.request({
        url: `/admin2/templates`,
        params: { page, ...filtersObj }
    })
}

export function createAsset(data) {
    const body = new FormData()
    const { file = {} } = data
    body.append('file', file)
    body.append('name', data.name)
    body.append('type', data.type)
    return axiosInstance.request({
        url: `/admin2/templates`,
        data: body,
        method: 'POST'
    })
}

export function loadStudents(page = 1, query) {
    return axiosInstance.request({
        url: '/admin2/students',
        params: { page, query }
    })
}

export function addStudent(data) {
    return axiosInstance.request({
        url: '/admin2/students',
        data,
        method: 'POST'
    })
}

export function loadTariff(page = 1) {
    return axiosInstance.request({
        url: '/admin2/tariffs',
        params: { page }
    })
}

export function createTariff(data) {
    return axiosInstance.request({
        url: '/admin2/tariffs',
        data,
        method: 'POST'
    })
}

export function deleteTariff(tariffId) {
    return axiosInstance.request({
        url: `/admin2/tariff/${tariffId}`,
        method: 'DELETE'
    })
}

export function updateTariff(tariffId, data) {
    return axiosInstance.request({
        url: `/admin2/tariff/${tariffId}`,
        data,
        method: 'PUT'
    })
}

export function subscribeStudents(tariffId, students) {
    return axiosInstance.request({
        url: `/admin2/tariff/${tariffId}/subscribe`,
        data: {
            students
        },
        method: 'POST'
    })
}

export function createTestCase(themeId, data) {
    return axiosInstance.request({
        url: `/admin2/theme/${themeId}/test_cases`,
        data,
        method: 'POST'
    })
}

export function getTestCases(themeId) {
    return axiosInstance.request({
        url: `~admin2/theme/${theme_id}/test_cases`
    })
}

export function deleteTestCase(themeId, testCaseId) {
    return axiosInstance.request({
        url: `/admin2/theme/${themeId}/test_case/${testCaseId}`,
        method: 'DELETE'
    })
}

export function updateTestCase(themeId, testCaseId, data) {
    return axiosInstance.request({
        url: `/admin2/theme/${themId}/test_case/${testCaseId}`,
        data,
        method: 'PUT'
    })
}

export function deleteAnswer(testId, answerId) {
    return axiosInstance.request({
        url: `/admin2/test/${testId}/answer/${answerId}`,
        method: 'DELETE'
    })
}

export function deleteTest(testCaseId, testId) {
    return axiosInstance.request({
        url: `/admin2/test_case/${testCaseId}/test/${testId}`,
        method: 'DELETE'
    })
}
