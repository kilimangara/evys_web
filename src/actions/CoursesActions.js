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

  export function loadThemes(id){
    return {
      types: actionTypesFor('show', 'themes'),
      meta: {
        fetch: {
          url: `~student/course/${id}/themes`,
        }
      }
    }
  }