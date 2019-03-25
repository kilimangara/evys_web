import {
    loadSubjectStudentTest,
    loadSubjectStudents,
    createStudentEvent,
    getTestBlock,
    updateTestBlock
} from '../../reducers/admin/subjects'

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

        getTestBlock = () => {
            this.setState({ fetching: true })
            this.props
                .getTestBlock(this.testBlockId())
                .then(({ data }) => {
                    this.setState({ testBlock: data })
                })
                .catch(error => {
                    this.setState({ fetching: true })
                })
        }

        updateTestBlock = () => {
            this.props
                .updateTestBlock(this.testBlockId(), this.state.testBlock)
                .then(({ data }) => {
                    this.setState({ testBlock: data })
                })
                .catch(error => {
                    this.setState({ fetching: true })
                })
        }

        subjectId = () => this.props.match.params['subjectId']

        studentId = () => this.props.match.params['studentId']

        testBlockId = () => this.props.match.params['testBlockId']

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
        createStudentEvent,
        getTestBlock,
        updateTestBlock
    }
}
