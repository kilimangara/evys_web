import { actionTypesFor } from 'trivial-redux'
import { COURSE_IS_NOT_VALID, COURSE_IS_VALID } from '../endpoints/courses'

export function loadCurrentCourses() {
    return {
        types: actionTypesFor('index', 'courses'),
        meta: {
            fetch: {
                url: `~student/courses`,
                type: 'GET',
                params: {
                    progress_to: '99'
                }
            }
        }
    }
}

export function loadCourseById(course_id) {
    return {
        types: actionTypesFor('index', 'courses'),
        meta: {
            fetch: {
                url: `~student/course/${course_id}`
            }
        }
    }
}

export function loadFinishedCourses() {
    return {
        types: actionTypesFor('index', 'courses'),
        meta: {
            fetch: {
                url: `~student/courses`,
                params: {
                    progress_from: '100'
                }
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

export function loadThemeById(theme_id) {
    return {
        types: actionTypesFor('show', 'themes'),
        meta: {
            fetch: {
                url: `~student/theme/${theme_id}`
            }
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
