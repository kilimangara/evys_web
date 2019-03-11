import {
    loadTestCases,
    putTestCase,
    removeTestCase,
    removeTest,
    removeAnswer,
    newTestCase,
    generatePDF
} from '../../reducers/admin/testCase'
import produce from 'immer'
import downloadFile from 'js-file-download'

export default superclass =>
    class TestCaseRepository extends superclass {
        standardTests = () => [
            {
                name: 'Название вопроса',
                task: '<p>Выберите правильный ответ</p>',
                tip: '<p>Пусто</p>',
                answers: [
                    {
                        content: 'Неправильный ответ!',
                        is_right: false
                    },
                    {
                        content: 'Правильный ответ!',
                        is_right: true
                    }
                ]
            }
        ]

        themeId = () => this.props.match.params['themeId']

        loadTestCases = () => {
            this.setState({ loading: true })
            return this.props
                .loadTestCases(this.themeId())
                .then(({ data }) => {
                    this.setState({ testCases: data, loading: false })
                })
                .catch(err => {
                    this.setState({ loading: false })
                })
        }

        updateTestCase = testCaseId => {
            const tsIndex = this.state.testCases.findIndex(el => el.id === testCaseId)
            if (tsIndex === -1) return
            const data = this.state.testCases[tsIndex]
            return this.props.putTestCase(this.themeId(), testCaseId, data).then(({ data }) => {
                this.setState(
                    produce(this.state, draft => {
                        draft.testCases.splice(tsIndex, 1, data)
                    })
                )
            })
        }

        deleteAnswer = (testId, answerId) => {
            return this.props.removeAnswer(testId, answerId)
        }

        deleteTestCase = testCaseId => {
            return this.props.removeTestCase(this.themeId(), testCaseId).then(this.loadTestCases)
        }

        createTestCase = (analogueId, description) => {
            return this.props
                .newTestCase(this.themeId(), { analogueId, description, tests: this.standardTests() })
                .then(response => {
                    this.loadTestCases()
                    return response
                })
        }

        generatePDF = () => {
            return this.props.generatePDF(this.themeId()).then(({ data }) => {
                downloadFile(data, 'generated_tests.pdf')
            })
        }
    }

export class TestCaseProvider {
    static mapStateToProps = null

    static mapDispatchToProps = {
        loadTestCases,
        putTestCase,
        removeTestCase,
        removeTest,
        removeAnswer,
        newTestCase,
        generatePDF
    }
}
