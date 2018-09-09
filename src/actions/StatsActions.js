import {actionTypesFor} from './actionTypesFor'

export function loadStats(){
  return {
    types: actionTypesFor('index', 'stats'),
    meta: {
      fetch: {
        url:'~stats'
      }
    }
  }
}

export function loadRepeats(){
  return {
    types: actionTypesFor('repeats', 'stats'),
    meta: {
      fetch: {
        url: `~last_repeats`
      }
    }
  }
}

export function loadActions(){
  return {
    types: actionTypesFor('suggestions', 'stats'),
    meta: {
      fetch: {
        url: `~suggestions`
      }
    }
  }
}
