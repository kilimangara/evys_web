
import { actionTypesFor } from 'trivial-redux'
import { COURSE_IS_NOT_VALID, COURSE_IS_VALID } from '../endpoints/courses'

export function loadCourses() {
  return {
    types: actionTypesFor('show', 'courses'),
    meta: {
      fetch: {
        url: `~student/courses`,
      }
    }
  }
}

export function loadThemes(course_id, theme_id) {
  return {
    types: actionTypesFor('show', 'themes'),
    meta: {
      fetch: {
        url: `~student/course/${course_id}/themes`,
        params: {
          parent_theme: theme_id
        }
      },
      with_parent_theme: Boolean(theme_id),
      is_course: true
    }
  }
}

export function goToCoursesPage() {
  return {
    type: COURSE_IS_NOT_VALID
  }
}

export function refreshCoursesValid() {
  return {
    type: COURSE_IS_VALID
  }
}  
