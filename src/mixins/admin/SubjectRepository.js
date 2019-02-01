import { loadSubject, loadSubjects, newSubject, deleteSubject, updateSubject } from '../../reducers/admin/subjects'

export default superclass =>
    class SubjectRepository extends superclass {
        //Здесь методы для работы с данными из компонента
    }

export class SubjectProvider {
    static mapStateToProps = state => ({
        subjects: state.subjects.list,
        subjectsFetching: state.subjects.fetching
    })

    static mapDispatchToProps = {
        loadSubject,
        loadSubjects,
        createSubject: newSubject,
        updateSubject,
        deleteSubject
    }
}
