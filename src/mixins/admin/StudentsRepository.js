import { getStudents, newStudent, addStudentsToTariff } from '../../reducers/admin/students'

export default superclass =>
    class StudentsRepository extends superclass {
        queryTariffId = () => {
            const paramsStr = this.props.location && this.props.location.search
            const params = new URLSearchParams(paramsStr)
            return params.get('tariff_id')
        }

        queryTariffName = () => {
            const paramsStr = this.props.location.search
            const params = new URLSearchParams(paramsStr)
            return params.get('tariff_name')
        }

        hasTariffInQuery = () => {
            return Boolean(this.queryTariffId()) && Boolean(this.queryTariffName())
        }

        hasMorePages = () => this.props.totalPages > this.props.currentPage

        students = () => this.props.students

        noStudents = () => {
            return !this.props.students.length && !this.props.studentsFetching && this.props.currentPage === 1
        }
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
