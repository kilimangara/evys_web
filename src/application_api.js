import { store } from './store'
import axios from 'axios'
import humps from 'humps'

const baseURL = __DEV__ ? 'http://localhost:8000/external_app/' : 'https://evys.ru/external_app/'

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

function camelizeResponse(response) {
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
}

function applicationAuth(config) {
    const { application } = store.getState()
    if (application.token) config.headers['Authorization'] = `Bearer ${application.token}`
    if (application.accountName) config.headers['Account-Name'] = application.accountName
    return transformRequest(config)
}

axiosInstance.interceptors.request.use(config => {
    return applicationAuth(config)
})

axiosInstance.interceptors.response.use(
    response => {
        return camelizeResponse(response)
    },
    error => {
        error.response = camelizeResponse(error.response)
        if (error.response.data.error) {
            error.response.data = error.response.data.error
        }
        return Promise.reject(error)
    }
)

export function getYandexMoneyAccount() {
    return axiosInstance.request({
        url: 'yandex_money/account'
    })
}

export function saveYandexMoneyAccount(data) {
    return axiosInstance.request({
        url: 'yandex_money/account',
        data,
        method: 'POST'
    })
}
