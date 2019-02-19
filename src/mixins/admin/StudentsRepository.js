import { getStudents, newStudent, addStudentsToTariff } from '../../reducers/admin/students'

export default superclass =>
    class StudentsRepository extends superclass {
        tariffId = () => {
            const paramsStr = this.props.location.search
            const params = new URLSearchParams(paramsStr)
            return params.get('tariff_id')
        }

        hasMorePages = () => this.props.totalPages > this.props.currentPage

        students = () => this.props.students
    }

export class StudentsProvider {
    static mapStateToProps = state => ({
        students: state.students.list,
        studentsFetching: state.students.fetching,
        totalPages: state.students.totalPages,
        currentPage: state.students.currentPage,
        student: state.students.current
    })

    static mapDispatchToProps = {
        getStudents,
        newStudent,
        addStudentsToTariff
    }
}
