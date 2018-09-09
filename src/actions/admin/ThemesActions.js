import {actionTypesFor} from '../actionTypesFor'


export function loadThemesBySubject(subject_id, page=1, parent_theme=undefined){
  return {
    types: actionTypesFor('index', 'themes_admin'),
    meta: {
      fetch: {
        url: `~admin2/subject/${subject_id}/themes`,
        params: {page, parent_theme}
      },
      page,
      parent_theme
    }
  }
}

export function updateTheme(theme_id, data){
  return {
    types: actionTypesFor('update', 'themes_admin'),
    meta: {
      fetch: {
        url: `~admin2/theme/${theme_id}`,
        data,
        method: 'PUT'
      },
    }
  }
}

export function deleteTheme(theme_id, data){
  return {
    types: actionTypesFor('delete', 'themes_admin'),
    meta: {
      fetch: {
        url: `~admin2/theme/${theme_id}`,
        method: 'DELETE'
      },
    }
  }
}

export function createThemeBySubject(subject_id, data){
  return {
    types: actionTypesFor('create', 'themes_admin'),
    meta: {
      fetch: {
        url: `~admin2/subject/${subject_id}/themes`,
        data,
        method: 'POST'
      },
    }
  }
}

export function getTheory(theme_id){
  return {
    types: actionTypesFor('show', 'theory_admin'),
    meta: {
      fetch: {
        url: `~admin2/theme/${theme_id}/theory`,
      }
    }
  }
}

export function createTheory(theme_id, data){
  return {
    types: actionTypesFor('create', 'theory_admin'),
    meta: {
      fetch: {
        url: `~admin2/theme/${theme_id}/theory`,
        data,
        method: 'POST'
      }
    }
  }
}

export function getVideos(theory_id) {
  return {
    types: actionTypesFor('index', 'videos_admin'),
    meta: {
      fetch: {
        url: `~admin2/storage/video/${theory_id}`
      }
    }
  }
}

export function createVideo(theory_id, data) {
  return {
    types: actionTypesFor('create', 'videos_admin'),
    meta: {
      fetch: {
        url: `~admin2/storage/video/${theory_id}`,
        data,
        method: 'POST'
      }
    }
  }
}
