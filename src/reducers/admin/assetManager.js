import { createAction, createReducer } from 'redux-act'
import produce from 'immer'
import {createAsset} from '../../api'

const initialState = {
    managerOpened: false,
    asset: null,
    meta: null
}

export const assetPicked = createAction('asset-manager/asset-picked')
export const switchManager = createAction('asset-manager/switch-manager')

export const uploadAsset = (data) => dispatch {
  return createAsset(data)
}

export default createReducer(
    {
        [assetPicked]: (state, assetData) =>
            produce(state, draft => {
                draft.asset = assetData.asset
                draft.meta = assetData.meta
            }),
        [switchManager]: state =>
            produce(state, draft => {
                draft.managerOpened = !state.managerOpened
            })
    },
    initialState
)
