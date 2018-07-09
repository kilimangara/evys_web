import {actionTypesFor} from 'trivial-redux'

export function loadCourses(){
    return {
      types: actionTypesFor('show', 'courses'),
      meta: {
        fetch: {
          url: `~student/courses`,
        }
      }
    }
  }