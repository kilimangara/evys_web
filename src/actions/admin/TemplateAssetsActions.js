import {actionTypesFor} from '../actionTypesFor'
import {SWITCH_MANAGER, ASSET_PICKED} from '../../modules/asset_manager'

export function loadAssets(page=1, filtersObj={}){
  return {
    types: actionTypesFor('index', 'assets_admin'),
    meta: {
      fetch: {
        url:`~admin2/templates`,
        params:{page, ...filtersObj}
      }
    }
  }
}

export function createAsset(data){
  const body = new FormData()
  const {file={}} = data
  body.append('file', file)
  body.append('name', data.name)
  body.append('type', data.type)
  return {
    types: actionTypesFor('create', 'assets_admin'),
    meta: {
      fetch: {
        url:`~admin2/templates`,
        data: body,
        method: 'POST'
      }
    }
  }
}

export function switchManager(){
  return {
    type: SWITCH_MANAGER
  }
}

export function pickAsset(asset, meta){
  return {
    type: ASSET_PICKED,
    meta,
    asset
  }
}
