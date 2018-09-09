import {actionTypesFor} from './actionTypesFor'


export function loadTariffs(tariff_type){
  return {
    types: actionTypesFor('index', 'tariffs'),
    meta:{
      fetch: {
        url:`~tariffs`,
        params:{tariff_type}
      }
    }
  }
}

export function subscribeTariff(id){
  return {
    types: actionTypesFor('create', 'tariffs'),
    meta: {
      fetch: {
        url: `~subscribe/${id}`,
        method: 'POST'
      }
    }
  }
}
