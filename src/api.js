import axios from 'axios'
import humps from 'humps'
import { store } from './store'
import { ADMIN_APP } from './utils/constants'
import { logoutAdmin } from './reducers/admin/authorization'
import { logoutAccount, changeBlockedAccount } from './reducers/admin/account'

import { exitProfile } from './reducers/student/auth'

console.log(__DEV__, __CURRENT_APP__)

const baseURL = __DEV__ ? 'http://localhost:8000/api/' : 'https://evys.ru/api/'

const axiosInstance = axios.create({
    baseURL
})

function transformRequest(config) {
    if (config.data instanceof FormData) return config
    if (config.data) {
        config.data = humps.decamelizeKeys(config.data)
    }
    if (config.params) {
        config.params = humps.decamelizeKeys(config.params)
    }
    return config
}

function basicAdminAuth(config) {
    const { authorization, account } = store.getState()
    if (authorization.token) config.headers['Authorization'] = `Basic ${authorization.token}`
    if (account.currentAccount) config.headers['Account-Name'] = account.currentAccount
    return transformRequest(config)
}

function studentTokenAuth(config) {
    const { auth } = store.getState()
    if (auth.token) config.headers['Authorization'] = `Student ${auth.token}`
    return transformRequest(config)
}

function autoLogoutAdmin(error) {
    store.dispatch(logoutAdmin())
}

function autoLogoutStudent(error) {
    store.dispatch(exitProfile())
}

function handleForbiddenAdmin(error) {
    if (error.response.data.error.type === 'INVALID ACCOUNT') {
        store.dispatch(logoutAccount())
    }
    if (error.response.data.error.type === 'ACCOUNT BLOCKED') {
        store.dispatch(changeBlockedAccount(true))
    }
}

axiosInstance.interceptors.request.use(config => {
    if (__CURRENT_APP__ === ADMIN_APP) return basicAdminAuth(config)
    return studentTokenAuth(config)
})

axiosInstance.interceptors.response.use(
    response => {
        let { data } = response
        if (data instanceof Blob) return response
        data = humps.camelizeKeys(data)
        if (!data) return response
        if (data.data) {
            response.data = data.data
            return response
        }
        if (data.error) {
            response.data = data.error
            return response
        }
        response.data = data
        return response
    },
    error => {
        if (error.response.status === 401) {
            if (__CURRENT_APP__ === ADMIN_APP) autoLogoutAdmin(error)
            else autoLogoutStudent(error)
            // window.location = '/login'
        }
        if (error.response.status === 403) {
            if (__CURRENT_APP__ === ADMIN_APP) handleForbiddenAdmin(error)
        }
        if (error.response.data.error) {
            error.response.data = error.response.data.error
        }
        return Promise.reject(error)
    }
)

// student methods

// student authorization

export function sendCode(phone) {
    return axiosInstance.request({
        url: '/student/code',
        method: 'POST',
        data: { phone }
    })
}

export function searchSubjects(params) {
    return axiosInstance.request({
        url: 'student/subjects/search',
        params
    })
}

export function sendAuthorizeCode(phone, code) {
    return axiosInstance.request({
        url: '/student/auth',
        method: 'POST',
        data: { phone, code }
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
        url: `/student/course/${courseId}/themes`,
        meta: {
            fetch: {
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

export function getTariffInfo(subjectId) {
    return axiosInstance.request({
        url: `/tariff/${subjectId}`
    })
}

export function getTariffThemes(subjectId) {
    return axiosInstance.request({
        url: `/tariff/${subjectId}/materials`
    })
}

export function getTariffRates(subjectId) {
    return axiosInstance.request({
        url: `/tariff/${subjectId}/rates`
    })
}

export function sendComment(subjectId, data) {
    return axiosInstance.request({
        url: `/tariff/${subjectId}/rates`,
        method: 'POST',
        data
    })
}

export function subscribeToTariff(subjectId) {
    return axiosInstance.request({
        url: `/tariff/${subjectId}/subscribe`,
        method: 'POST'
    })
}

export function getStudentThemeVideo(themeId) {
    return axiosInstance.request({
        url: `/student/theme/${themeId}/theory_video`
    })
}

export function startTestingSession(themeId) {
    return axiosInstance.request({
        url: `student/theme/${themeId}/start_testing`
    })
}

export function getTestQuestion(themeId, params) {
    return axiosInstance.request({
        url: `student/theme/${themeId}/question`,
        params
    })
}

export function sendTestQuestionAnswer(themeId, data) {
    return axiosInstance.request({
        url: `student/theme/${themeId}/answer`,
        method: 'POST',
        data
    })
}

export function getPopularSubjects() {
    return axiosInstance.request({
        url: '/student/subjects/popular'
    })
}

// admin methods

export function getAccounts() {
    return axiosInstance.request({
        url: '/admin2/accounts'
    })
}

export function createAccount(data) {
    return axiosInstance.request({
        url: '/admin2/accounts',
        method: 'POST',
        data
    })
}

export function createUser(data) {
    return axiosInstance.request({
        url: '/admin2/create_user',
        method: 'POST',
        data
    })
}

export function profileInfo() {
    return axiosInstance.request({
        url: '/admin2/info'
    })
}

export function getSubjects(page = 1, query = '') {
    return axiosInstance.request({
        url: '/admin2/subjects',
        params: { page, query }
    })
}

export function getSubject(subjectId) {
    return axiosInstance.request({
        url: `/admin2/subject/${subjectId}`
    })
}

export function createSubject(data) {
    return axiosInstance.request({
        url: '/admin2/subjects',
        method: 'POST',
        data: data
    })
}

export function putSubject(subjectId, data) {
    return axiosInstance.request({
        url: `/admin2/subject/${subjectId}`,
        method: 'PUT',
        data
    })
}

export function deleteSubject(subjectId) {
    return axiosInstance.request({
        url: `/admin2/subject/${subjectId}`,
        method: 'DELETE'
    })
}

export function fetchCategories() {
    return axiosInstance.request({
        url: `/category`
    })
}

export function getSubjectThemes(subjectId, params) {
    return axiosInstance.request({
        url: `/admin2/subject/${subjectId}/themes`,
        params: params
    })
}

export function createSubjectTheme(subjectId, data) {
    return axiosInstance.request({
        url: `/admin2/subject/${subjectId}/themes`,
        data,
        method: 'POST'
    })
}

export function getTheme(themeId) {
    return axiosInstance.request({
        url: `/admin2/theme/${themeId}`,
        method: 'GET'
    })
}

export function deleteTheme(themeId) {
    return axiosInstance.request({
        url: `/admin2/theme/${themeId}`,
        method: 'DELETE'
    })
}

export function updateTheme(themeId, data) {
    return axiosInstance.request({
        url: `/admin2/theme/${themeId}`,
        method: 'PUT',
        data
    })
}

export function getThemeTheory(themeId) {
    return axiosInstance.request({
        url: `/admin2/theme/${themeId}/theory`
    })
}

export function createThemeTheory(themeId, data) {
    return axiosInstance.request({
        url: `/admin2/theme/${themeId}/theory`,
        method: 'POST',
        data
    })
}

export function generatePDFTests(themeId) {
    return axiosInstance.request({
        url: `/admin2/theme/${themeId}/to_pdf`,
        method: 'GET',
        responseType: 'blob'
    })
}

export function getTheoryVideos(theoryId) {
    return axiosInstance.request({
        url: `/admin2/storage/video/${theoryId}`
    })
}

export function createTheoryVideo(theoryId, data) {
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
        url: `/admin2/theme/${themeId}/test_cases`
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
        url: `/admin2/theme/${themeId}/test_case/${testCaseId}`,
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

// admin billing methods

export function getBillingPlan() {
    return axiosInstance.request({
        url: `/admin2/personal_tariff`,
        method: 'GET'
    })
}

export function createBillingPlan(data, isDraft = false) {
    return axiosInstance.request({
        url: `/admin2/personal_tariff`,
        method: 'POST',
        data: {
            ...data,
            draft: isDraft
        }
    })
}

export function getInvoices(params = {}) {
    return axiosInstance.request({
        url: '/admin2/invoices',
        method: 'GET',
        params
    })
}
