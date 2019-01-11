import { connect } from 'react-redux'
import { loadSubject, loadSubjects, createSubject } from '../../reducers/admin/subjects'

export default superclass => {
  class SubjectRepository extends superclass {


  }

  const mapStateToProps = state => ({
    subjects: state.subjects.list,
    subjectsFetching: state.subjects.fetching
  })

  const mapDispatchToProps = {
    loadSubject,
    loadSubjects
  }

  return connect(mapStateToProps, mapDispatchToProps)(SubjectRepository)
}
