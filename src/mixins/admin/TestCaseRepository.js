import {
  loadTestCases,
  putTestCase,
  removeTestCase,
  removeTest,
  removeAnswer,
  newTestCase
} from '../../reducers/admin/testCase'

export default superclass =>
    class TestCaseRepository extends superclass {

        themeId = () => this.props.match.params['themeId']

        loadTestCases = () => {
          this.setState({loading: true})
          return this.props.loadTestCases(this.themeId())
                    .then(({data}) => {
                      this.setState({testCases: data, loading: false})
                    }).catch((err) => {
                      this.setState({loading: false})
                    })
        }

        createTestCase = (analogueId, description) => {
          return this.props.newTestCase(this.themeId(),{analogueId, description})
                    .then(this.loadTestCases)
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
      newTestCase
  }
}
