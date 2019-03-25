import { loadSubjectStudentTest, loadSubjectStudents, createStudentEvent } from '../../reducers/admin/subjects'

export default superclass =>
    class StudentTestBlockRepository extends superclass {
        getStudentTests = (page = 1, themeId) => {
            this.setState({ fetching: true })
            this.props
                .loadSubjectStudentTest(this.subjectId(), this.studentId(), { page, themeId })
                .then(({ data }) => {
                    const { count, results } = data
                    this.setState({ tests: results, totalPages: count, currentPage: page, fetching: false })
                })
                .catch(({ response }) => {
                    this.setState({ fetching: false })
                })
        }

        subjectId = () => this.props.match.params['subjectId']

        studentId = () => this.props.match.params['studentId']

        tests = () => this.state.tests

        noTests = () => {
            return !this.state.tests.length && !this.state.fetching && this.state.currentPage === 1
        }
    }

export class TestBlockProvider {
    static mapStateToProps = null

    static mapDispatchToProps = {
        loadSubjectStudentTest,
        loadSubjectStudents,
        createStudentEvent
    }
}
