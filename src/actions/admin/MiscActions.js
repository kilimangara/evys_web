import {actionTypesFor} from '../actionTypesFor'

export function createDistribution(data){
  return {
    types: actionTypesFor('create', 'misc'),
    meta: {
      fetch:{
        url:'~admin2/distribution',
        data,
        method: 'POST'
      }
    }
  }
}
