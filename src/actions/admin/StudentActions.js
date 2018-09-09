import {actionTypesFor} from '../actionTypesFor'


export function loadStudents(page=1, query=undefined){
  return {
    types: actionTypesFor('index', 'students_admin'),
    meta: {
      fetch: {
        url: '~admin2/students',
        params: {page, query}
      },
      page,
      query
    }
  }
}

export function addStudent(data){
  return {
    types: actionTypesFor('create', 'students_admin'),
    meta: {
      fetch: {
        url: `~admin2/students`,
        data,
        method: 'POST'
      }
    }
  }
}
