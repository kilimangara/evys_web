import { createAction, createReducer } from 'redux-act'
import produce from 'immer'

import { loadTariff, createTariff, deleteTariff, updateTariff, subscribeStudents } from '../../api'
import { merge, omit } from 'lodash'

const initialState = {
    list: [],
    totalPages: 1,
    currentPage: 0,
    fetching: false,
    current: null
}

export const startLoadingTariffs = createAction('tariffs/start-loading')
export const successLoadingTariffs = createAction('tariffs/success-loading')
export const successShowTariff = createAction('tariffs/success-show')
export const resetTariffsList = createAction('tariffs/reset-list')
export const replaceTariff = createAction('tariffs/replace-tariff')

export const loadTariffs = (page = 1, query = '') => dispatch => {
    dispatch(startLoadingtariffs())
    return loadtariffs(page, query).then(response => {
        const { data } = response
        const { count, result } = data
        return dispatch(
            successLoadingtariffs({
                list: result,
                totalPages: count,
                currentPage: page,
                fetching: false
            })
        )
    })
}

export const destroyTariff = (tariffId) => (dispatch) => {
  return deleteTariff(tariffId)
}

export const newTariff = (
    data
) => (dispatch) => {
  return createTariff(data)
}

export const changeTariff = (tariffId, data) => dispatch => {
  return updateTariff(tariffId, data)
}

export default createReducer(
    {
        [startLoadingTariffs]: state =>
            produce(state, draft => {
                draft.fetching = true
            }),
        [successLoadingTariffs]: (state, payload) =>
            produce(state, draft => {
                if (payload.currentPage !== 1) payload.unshift(...state.list)
                merge(draft, payload)
            }),
        [resetTariffsList]: (state, payload) => produce(state, draft => merge(draft, omit(initialState, ['current'])))
        [successShowTariff]: (state, payload) =>
            produce(state, draft => {
                draft.current = payload
            }),
        [replaceTariff]: (state, payload) =>
            produce(state, draft => {
                let tariff = draft.list.find(el => el.id === payload.id)
                if (Boolean(tariff)) merge(tariff, payload)
            })
    },
    initialState
)
