import { loadSubject, loadSubjects, newSubject, deleteSubject, updateSubject } from '../../reducers/admin/subjects'

export default superclass =>
    class SubjectRepository extends superclass {
        //Здесь методы для работы с данными из компонента

        getSubject = () => {
          const id = this.subjectId()
          this.props.loadSubject(id)
        }

        subjectId = () => this.props.match.params['subjectId']

        subject = () => this.props.subject
    }

export class SubjectProvider {
    static mapStateToProps = state => ({
        subjects: state.subjects.list,
        subjectsFetching: state.subjects.fetching,
        subject: state.subjects.current
    })

    static mapDispatchToProps = {
        loadSubject,
        loadSubjects,
        createSubject: newSubject,
        updateSubject,
        deleteSubject
    }
}
