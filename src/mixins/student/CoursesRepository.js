import {
    getCourseById,
    getCurrentCourses,
    getFinishedCourses,
    loadThemeById,
    loadThemes,
    loadTheoryByThemeId
} from '../../reducers/student/courses'

export default superclass => class CoursesRepository extends superclass {}

export class CoursesProvider {
    static mapStateToProps = state => ({
        coursesList: state.courses.coursesList,
        fetching: state.courses.fetching,
        currentCourse: state.courses.currentCourse
    })

    static mapDispatchToProps = {
        getCourseById,
        getFinishedCourses,
        getCurrentCourses,
        loadThemes,
        loadTheoryByThemeId,
        loadThemeById
    }
}
