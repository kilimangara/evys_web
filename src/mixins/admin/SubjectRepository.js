import { connect } from 'react-redux'
import { loadSubject, loadSubjects, createSubject } from '../../reducers/admin/subjects'

export default superclass =>
  class SubjectRepository extends superclass {


  }


export class SubjectProvider {

  static mapStateToProps = state => ({
    subjects: state.subjects.list,
    subjectsFetching: state.subjects.fetching
  })

  static mapDispatchToProps = {
    loadSubject,
    loadSubjects
  }
}
