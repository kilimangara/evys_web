

export const ASSET_PICKED = 'ASSET_PICKED'
export const SWITCH_MANAGER = 'SWITCH_MANAGER'

const initialState = {
  managerOpened: false,
  asset: null,
  meta: null
}

export default function (state=initialState, action){
  switch(action.type){
    case SWITCH_MANAGER:
      return {...state, managerOpened: !state.managerOpened}
    case ASSET_PICKED:
      const {asset, meta} = action
      return {...state, asset, meta}
    default:
      return state
  }
}
