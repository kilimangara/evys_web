import { createAction, createReducer } from 'redux-act'
import produce from 'immer'

const initialState = {
    header: null,
    backUrl: null,
    additions: null
}

export const changeHeader = createAction('navigation/change-header')
export const resetHeader = createAction('navigation/reset-header')

export default createReducer(
    {
        [changeHeader]: (state, headerData) =>
            produce(state, draft => {
                if (headerData.header) draft.header = headerData.header
                if (headerData.backUrl) draft.backUrl = headerData.backUrl
            }),
        [resetHeader]: state => initialState
    },
    initialState
)
