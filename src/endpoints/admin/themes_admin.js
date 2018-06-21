import {LOGOUT_ADMIN} from './auth_admin'
import update from 'immutability-helper'

export const INNER_THEME = 'INNER_THEME'

const initialState = {
  pageTree: {null:1},
  totalPagesTree: {null:1},
  themesTree: {},
  currentParentTheme: null,
  fetching: false
}

function nextPageThemes(state, themes, newPage, totalPages, parentTheme=null){
  let newThemesTree = state.themesTree
  let page = newPage === 1 ? newPage : newPage + 1
  if(newPage === 1){
    newThemesTree = update(newThemesTree, {$merge: {[parentTheme]: themes}})
  } else {
    const newThemeList = state.themesTree[parentTheme].concat(themes)
    newThemesTree = update(newThemesTree, {$merge: {[parentTheme]: newThemeList}})
  }
  const pageTree = update(state.pageTree, {$merge: {[parentTheme]: page}})
  const totalPagesTree = update(state.totalPagesTree, {$merge: {[parentTheme]: totalPages}})
  return {...state, currentParentTheme: parentTheme, pageTree, themesTree: newThemesTree, totalPagesTree}
}

export default {
  entry: `~admin2/subjects`,
  skipFormat: true,
  initialState,
  reducer(state, action) {
    switch(action.type){
      case this.types.index.success:
        return nextPageThemes(state, action.payload.results, action.meta.page,
                              action.payload.count, action.meta.parent_theme)
      case LOGOUT_ADMIN:
        return initialState
      default:
        return state
    }
  }
}
