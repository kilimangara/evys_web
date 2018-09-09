import {actionTypesFor} from '../actionTypesFor'

export function loadTariffs(page=1){
  return {
    types: actionTypesFor('index', 'tariffs_admin'),
    meta: {
      fetch: {
        url:'~admin2/tariffs',
        params: {page}
      }
    }
  }
}

export function createTariff(data){
  return {
    types: actionTypesFor('create', 'tariffs_admin'),
    meta: {
      fetch: {
        url: `~admin2/tariffs`,
        method: 'POST',
        data
      }
    }
  }
}

export function deleteTariff(tariff_id){
  return {
    types: actionTypesFor('delete', 'tariffs_admin'),
    meta: {
      fetch: {
        url: `~admin2/tariff/${tariff_id}`,
        method: 'DELETE'
      }
    }
  }
}

export function updateTariff(tariff_id, data){
  return {
    types: actionTypesFor('update', 'tariffs_admin'),
    meta: {
      fetch: {
        url: `~admin2/tariff/${tariff_id}`,
        method: 'PUT',
        data
      }
    }
  }
}

export function subscribeStudents(tariff_id, students){
  return {
    types: actionTypesFor('create', 'subscribe_admin'),
    meta: {
      fetch: {
        url:`~admin2/tariff/${tariff_id}/subscribe`,
        data: {
          students
        },
        method: 'POST'
      }
    }
  }
}
