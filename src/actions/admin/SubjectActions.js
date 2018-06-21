import {actionTypesFor} from 'trivial-redux'


export function loadSubjects(page=1, query=''){
  return {
    types: actionTypesFor('index', 'subjects_admin'),
    meta: {
      fetch: {
        url: '~admin2/subjects',
        params: {page, query}
      },
      page,
      query
    }
  }
}

export function getSubject(subject_id){
  return {
    types: actionTypesFor('show', 'subjects_admin'),
    meta: {
      fetch: {
        url: `~admin2/subject/${subject_id}`,
      }
    }
  }
}

export function updateSubject(subject_id, data){
  return {
    types: actionTypesFor('update', 'subjects_admin'),
    meta: {
      fetch: {
        url: `~admin2/subject/${subject_id}`,
        data,
        method: 'PUT'
      },
    }
  }
}

export function deleteSubject(subject_id){
  return {
    types: actionTypesFor('delete', 'subjects_admin'),
    meta: {
      fetch: {
        url: `~admin2/subject/${subject_id}`,
        method: 'DELETE'
      },
    }
  }
}

export function createSubject(data){
  return {
    types: actionTypesFor('create', 'subjects_admin'),
    meta: {
      fetch: {
        url: '~admin2/subjects',
        data,
        method: 'POST'
      }
    }
  }
}
