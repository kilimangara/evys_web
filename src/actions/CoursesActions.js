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

  export function loadThemes(course_id, theme_id){
    return {
      types: actionTypesFor('show', 'themes'),
      meta: {
        fetch: {
          url: `~student/course/${course_id}/themes`,
          params: {
            parent_theme: theme_id
          }
        },
        with_parent_theme: Boolean(theme_id)
      }
    }
  }
